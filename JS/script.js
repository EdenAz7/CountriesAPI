const myURL = "https://restcountries.com/v3.1/all";
const filterURL = "https://restcountries.com/v3.1/name/";
var filterData;

$("#allCountries").click(() => {
    $("#tableCountries").empty();
    $("#tableRegion").empty();
    getData();
})


$("#searchBtn").click(() => {
    $("#tableCountries").empty();
    $("#tableRegion").empty();
    getData($("#countrieName").val());
});

const getData = (filterData) => {
    $.ajax({
        url: (filterData == undefined) ? myURL : (filterURL + filterData),
        success: data => {
            $("#totalCountries").html(`total Countries:${data.length}`);
            data.map(item => item.name.common == undefined ? "err" : createTable(item));
            let population = 0;
            data.map(item => population += item.population);
            $("#population").html(`Total population: ${population}`);
            $("#avgPopulation").html(`average Population:${parseInt(population / data.length)}`);


            //Americas, Asia, Europe, Africa, Australia
            const totalAmericas = () => {
                return data.filter(item => item.region === "Americas").length;
            }
            const totalAsia = () => {
                return data.filter(item => item.region === "Asia").length;
            }
            const totalEurope = () => {
                return data.filter(item => item.region === "Europe").length;
            }
            const totalAfrica = () => {
                return data.filter(item => item.region === "Africa").length;
            }
            const totalOceania = () => {
                return data.filter(item => item.region === "Oceania").length;
            }

            //data.map(item=>console.log(item.name.common));
            $("#tableRegion").html(`
            <tr>
                <td>Americas: </td>
                <td>${totalAmericas()}</td>
            </tr>
            <tr>
                <td>Asia: </td>
                <td>${totalAsia()}</td>
            </tr>
            <tr>
                <td>Europe: </td>
                <td>${totalEurope()}</td>
            </tr>
            <tr>
                <td>Africa: </td>
                <td>${totalAfrica()}</td>
            </tr>
            <tr>
                <td>Oceania: </td>
                <td>${totalOceania()}</td>
            </tr>
            `);
        }
    });
}

const totalCountries = (data) => {
    $("#totalCountries").html(`total countries: ${data}`);
    $("#population").html(`Total population: ${data.population}`);
    $("#avgPopulation").html(`average Population:${parseInt(data.population / data.length)}`);
};
const createTable = (item) => {
    try{
        let tableCountry;
        tableCountry += `
        <tr>
            <td><img src=${item.flags.png} alt="flag ${item.name.common}"></td>
            <td>${item.name.common}</td>
            <td>${item.population}</td>
            <td>${Object.values(item.currencies)[0].symbol}</td>
        </tr>
        `;
        $("#tableCountries").append(tableCountry);
    }
    catch{
        $("#tableCountries").append(`<td><img src=${item.flags.png} alt="flag ${item.name.common}"></td>
        <td>${item.name.common}</td>
        <td>${item.population}</td>
        <td>${undefined}</td>`);
        console.log(item.flags.png+" "+item.name.common + item.population+" doesn't have symbol" );
    }
};



