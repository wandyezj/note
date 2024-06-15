import { downloadFileText } from "./core/downloadFileText";
import { uploadFileText } from "./core/uploadFileText";

function log(message: string) {
    console.log(`Note: ${message}`);
}

function getElementById(id: string) {
    const element = document.getElementById(id);
    if (element === null) {
        throw new Error(`Could not find element with id ${id}`);
    }
    return element;
}

const elements = {
    get textareaEdit() {
        return getElementById("textarea_edit") as HTMLTextAreaElement;
    },

    get buttonEditClear() {
        return getElementById("button_edit_clear") as HTMLButtonElement;
    },

    get buttonEditLoad() {
        return getElementById("button_edit_load") as HTMLButtonElement;
    },

    get buttonEditSave() {
        return getElementById("button_edit_save") as HTMLButtonElement;
    },
};

function buttonEditLoad() {
    const textarea = elements.textareaEdit;
    textarea.value = "loading...";
    uploadFileText().then((text) => {
        textarea.value = text;
    });
}

function buttonEditSave() {
    const textarea = elements.textareaEdit;
    const value = textarea.value;
    if (value.trim() === "") {
        log("buttonEditSave: will not save empty text");
        return;
    }

    const firstLine = value
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")[0];
    const firstLineLength = firstLine.length;
    const maxLength = 30;
    const picked = firstLine.slice(0, firstLineLength - 1 > maxLength ? maxLength : firstLineLength - 1).trim();
    // TODO: remove invalid characters from filename.

    const filename = `${picked}.txt`;
    downloadFileText({ text: value, filename });
}

function buttonEditClear() {
    const textarea = elements.textareaEdit;
    textarea.value = "";
}

function setup() {
    log("Setup");

    elements.buttonEditSave.onclick = buttonEditSave;
    elements.buttonEditLoad.onclick = buttonEditLoad;
    elements.buttonEditClear.onclick = buttonEditClear;
}

setup();
