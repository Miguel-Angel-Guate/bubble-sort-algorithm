const randoNumberArray = Array.from({
    length: 5
}, () => Math.floor(Math.random() * 9));

const main = document.createElement("main");

document.body.appendChild(main);
const h1 = document.createElement("h1");
const addH1 = h1.innerText = "Number Sorter";
main.appendChild(h1);
let form = document.createElement("form");
form.id = "form";
form.classList.add("form");
main.appendChild(form);
let fieldset = document.createElement("fieldset");
let sortButton = document.createElement("button");
sortButton.id = "sort";
sortButton.innerText = "Sort";
form.appendChild(fieldset);
let divContinerSelect = document.createElement("div");
fieldset.appendChild(divContinerSelect);
form.appendChild(sortButton);

function createSelectContainer(index) {
    const divContainer = document.createElement('div');
    const select = document.createElement('select');
    select.name = 'values';
    select.className = 'values-dropdown';
    select.setAttribute('aria-label', `number ${index}`);

    for (let i = 0; i <= 9; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        if (i === index) {
            option.selected = true;
        }
        select.appendChild(option);
    }

    divContainer.appendChild(select);

    return divContainer;
}

function appendSelectContainers(fieldset, count) {
    for (let i = 1; i <= count; i++) {
        const divContainer = createSelectContainer(i);
        fieldset.appendChild(divContainer);
    }
}

appendSelectContainers(fieldset, 5);

const divOutPutContainer = document.createElement('div');
divOutPutContainer.className = 'output-container';
main.appendChild(divOutPutContainer);
let h2text = document.createElement('h2');
h2text.innerText = "OutPut:";
divOutPutContainer.appendChild(h2text);

function createOutputArray(parentElement, count) {
    const outputArrayDiv = document.createElement('div');
    outputArrayDiv.className = 'output-array';


    for (let i = 0; i < count; i++) {
        const valueDiv = document.createElement('div');

        const outputValue = document.createElement('span');
        outputValue.className = 'output-value';
        outputValue.id = `output-value-${i}`;
        outputValue.innerHTML = '0';
        valueDiv.appendChild(outputValue);

        outputArrayDiv.appendChild(valueDiv);
    }
    parentElement.appendChild(outputArrayDiv);
}

// Usage

createOutputArray(divOutPutContainer, 5);



const getSortButton = document.getElementById("sort");

const sortInputArray = (event) => {
    event.preventDefault();

    const inputValues = [
        ...document.getElementsByClassName("values-dropdown")
    ].map((dropdown) => Number(dropdown.value));

    const sortedValues = inputValues.sort((a, b) => {
        return a - b;
    });
    console.log("🚀 ~ sortedValues ~ sortedValues:", sortedValues)

    updateUI(sortedValues);
}

const updateUI = (array = []) => {
    array.forEach((num, i) => {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;
    })
}

const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}

const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }

    return array;
}

const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        const currValue = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > currValue) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = currValue;
    }
    return array;
}

getSortButton.addEventListener("click", sortInputArray);