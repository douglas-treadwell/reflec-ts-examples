
// check if an object matches an interface, recursively.
export function isValid(object: any, interfaceObj: Interface): boolean {

    for (let member of interfaceObj.members) {
        if (isPrimitive(member.type) && object[member.name] != null && member.type.kind != typeof object[member.name]) {
            // found a primitive type field in the interface, but not in the object
            console.log(`Field ${member.name} should be ${member.type.kind} but it is ${typeof object[member.name]}`)
            return false;
        } else if (member.type.kind === 'interface' && object[member.name] != null) {
            // recursively check field type against the corresponding interface
            return isValid(object[member.name], <Interface>member.type);
        }
        // TODO: check class types...
    }

    return true;
}


function isPrimitive(type: Type): boolean {
    return type && (
        type.kind === "string" ||
        type.kind === "number" ||
        type.kind === "boolean"
    );
}
