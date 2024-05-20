let charts = {
    prediction: null,
    experiments: null,
}

document.addEventListener('DOMContentLoaded', () => {

    const options = {useFormat: true};
    const parser = new PublicGoogleSheetsParser(googleSheetId, options);

    parser.parse().then(gSheetData => {
        initPredictionForm(gSheetData);
        initPredictionSubmitForm(gSheetData);

        initExperimentSelect(gSheetData);
        displayExperimentGraph(gSheetData, 0);
    })
});

function initPredictionForm(gSheetData) {
    const params = {
        'icc-profile': 'Profil ICC',
        'film': 'Typon',
        'printer': 'Imprimante',
        'ink': 'Encre',
        'gelatin': 'Gélatine',
        'potassium-bichromate': 'Bichromate de potassium',
        'copper-plate-thickness': 'Épaisseur de la plaque de cuivre',
        'ferric-chloride-temperature': 'Température du perchlorure de fer',
        'room-humidity': 'Hygrométrie de la pièce',
        'film-density': 'Densité du film',
        'exposure': 'Insolation',
    };

    const form = document.querySelector('.js-form-prediction-inputs');

    for (const [key, value] of Object.entries(params)) {
        const optionsValues = [...new Map(gSheetData.map((line) => [line[value], line[value]])).values()];

        optionsValues.sort();

        let options = '';
        optionsValues.forEach((value) => {
            if (value !== undefined) {
                options += `<option value="${value}">${value}</option>`;
            }
        })
        
        const selectHTML = `<div>
            <label for="form-select-${key}">${value}</label>
            <select name="form-select-${key}" class="js-select-${key}" data-label="${value}">
                ${options}
            </select>
        </div>`;
        form.innerHTML += selectHTML;
    }
}

function initPredictionSubmitForm(gSheetData) {
    const form = document.querySelector('.js-form-prediction');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const filters = [];

        for (let i = 0; i < form.elements.length; ++i) {
            const element = form.elements[i];
            if (element.type === 'submit') {
                continue;
            }
            filters.push([element.dataset.label, element.value]);
        }

        const data = gSheetData.filter((line) => {
            return filters.every((filter) => {
                return line[filter[0]] === filter[1];
            });
        });
    
        displayPrediction(data);
    });
}

function displayPrediction(data) {
    const greyLevelsData = [];
    for (let level = 100; level >= 0; level -= 5) {

        const greyLevelTimes = [];
        for (let line = 0; line < data.length; ++line) {
            const userTime = data[line]["Gris " + level];

            if (userTime === undefined) {
                continue;
            }

            const time = new Date(`1970-01-01T00:${userTime}.000Z`).getTime();
            greyLevelTimes.push(time);
        }

        if (greyLevelTimes.length === 0) {
            continue;
        }

        const sum = greyLevelTimes.reduce((a, b) => a + b, 0);
        const average = sum / greyLevelTimes.length;
        const averageDate = new Date(average).toISOString();
        
        greyLevelsData.push({
            x: averageDate,
            y: level
        })
    }

    const bathData = [];
    for (let bath = 1; bath <= 5; bath++) {

        const bathTimes = [];
        for (let line = 0; line < data.length; ++line) {
            const userTime = data[line]["Bain " + bath];

            if (userTime === undefined) {
                continue;
            }

            const time = new Date(`1970-01-01T00:${userTime}.000Z`).getTime();
            bathTimes.push(time);
        }

        const sum = bathTimes.reduce((a, b) => a + b, 0);
        const average = sum / bathTimes.length;
        const averageDate = new Date(average).toISOString();
        
        bathData.push({
            x: averageDate,
            y: 0
        })
    }

    const ctx = document.querySelector('.js-chart-prediction');
    displayGraph('prediction', ctx, greyLevelsData, bathData);
}

function initExperimentSelect(gSheetData) {
    const selectExperiment = document.querySelector('.js-select-experiment');

    gSheetData.forEach((line, lineNumber) => {
        const label = `${line['ID']}, ${line['Héliograveur']}, ${line['Date']}`;
        selectExperiment.innerHTML += `<option value="${lineNumber}">${label}</option>`;
    });

    selectExperiment.addEventListener('change', (event) => {
        displayExperimentGraph(gSheetData, event.target.value);
    });
}

function displayExperimentGraph(gSheetData, lineNumber) {

    document.querySelector('.js-id').textContent = gSheetData[lineNumber]['ID'];
    document.querySelector('.js-date').textContent = gSheetData[lineNumber]['Date'];
    document.querySelector('.js-operator').textContent = gSheetData[lineNumber]['Héliograveur'];

    const greyLevelsData = [];
    for (let level = 100; level >= 0; level -= 5) {
        const levelStep = gSheetData[lineNumber]["Gris " + level];
        
        if (levelStep === undefined) {
            continue;
        }

        greyLevelsData.push({
            x: '1970-01-01T00:' + levelStep + '.000Z',
            y: level
        })
    }

    const bathData = [];
    for (let bath = 1; bath <= 5; bath++) {
        const bathStep = gSheetData[lineNumber]["Bain " + bath];

        bathData.push({
            x: '1970-01-01T00:' + bathStep + '.000Z',
            y: 0
        })
    }

    const ctx = document.querySelector('.js-chart-experiments');
    displayGraph('experiments', ctx, greyLevelsData, bathData);
}

function displayGraph(chartName, ctx, greyLevelsData, bathData) {
    if (charts[chartName]) {
        charts[chartName].destroy();
    }

    charts[chartName] = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: '',
                    data: greyLevelsData,
                    backgroundColor: '#00f',
                    borderColor: '#00f'
                },
                {
                    label: '',
                    data: bathData,
                    backgroundColor: '#f00',
                    borderColor: 'rgba(0,0,0,0)'
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            minute: 'm'
                        },
                        unit: 'minute',
                        tooltipFormat: 'mm:ss'
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    max: '1970-01-01T00:30:00.000Z'
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    },
                }
            }
        }
    });
}