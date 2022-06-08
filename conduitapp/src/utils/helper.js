export  default function dateToNormal(date){
    // 2022-06-08T13:28:36.206Z
    const toNormal = date.split("T");
    return toNormal[0];
}