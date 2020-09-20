import getCountryISO2 from "country-iso-3-to-2";

const unknownUrl = "https://image.flaticon.com/icons/svg/814/814513.svg";
const flagUrl = (iso) => {return "https://www.countryflags.io/"+iso+"/flat/32.png"};

export const flagImg = (location) => {
    const url = getCountryISO2(location) ? flagUrl(getCountryISO2(location).toLowerCase()) : unknownUrl;
    return url;
}