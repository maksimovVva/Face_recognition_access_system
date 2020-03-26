const fileExtensions = {
    "application/msword" : ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : ".docx",
    "application/vnd.ms-excel" : ".xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : ".xlsx",
    "application/vnd.ms-powerpoint" : ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" : ".pptx",
    "application/pdf" : ".pdf",
    "application/vnd.oasis.opendocument.text" : ".odt",
    "application/vnd.oasis.opendocument.graphics" : ".odg",
    "application/vnd.oasis.opendocument.presentation" : ".odp",
    "application/vnd.oasis.opendocument.spreadsheet" : "ods",
    "application/vnd.oasis.opendocument.text-master" : ".odm"
}

function getFileFullName(name, mimeType) {
    return `${name}${fileExtensions[mimeType] === undefined ? '' : fileExtensions[mimeType]}`;
}

function getValidFileExtensions() {
    let types = [];
    for(let type in fileExtensions){
        types.push(type);
    }
    return types;
}

export { getFileFullName, getValidFileExtensions }