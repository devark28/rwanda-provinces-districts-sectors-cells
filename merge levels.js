const countries = require('./countries.json');
const provinces = require('./provinces.json');
const districts = require('./districts.json');
const sectors = require('./sectors.json');
const cells = require('./cells.json');
const fs = require('fs');

// countries
// [
//     { "id": "0203e21f-38cb-421d-b0bc-b658dfe880ac", "name": "Sao Tome and Principe", "iso_code_2": "ST", "iso_code_3": "STP" },
//     ...,
// ]

// provinces
// [
//     { "id": "acf51649-b642-4bb8-843c-68e6a60dc32c", "country": "a4841b05-3d0e-4015-9959-e34745d51cb2", "code": "04", "name": "Northern", "identifier": "4" },
//     ...,
// ]

// districts
// [
//     { "id": "0865f82e-c716-4ae7-a85a-73e80a26dd59", "country": "a4841b05-3d0e-4015-9959-e34745d51cb2", "province": "e97f3cef-d377-4e56-9b97-b9a52049ca9a", "code": "0307", "name": "NYAMASHEKE" },
//     ...,
// ]

// sectors
// [
//     { "id": "01913318-d10d-4bef-b596-683def4aabe7", "country": "a4841b05-3d0e-4015-9959-e34745d51cb2", "province": "acf51649-b642-4bb8-843c-68e6a60dc32c", "district": "47eb7c25-4c58-4ec5-8026-d8369ec8a2f5", "code": "040109", "name": "MASORO", "identifier": "241" },
//     ...,
// ]

// cells
// [
//     { "id": "0069118d-bab9-4067-9b1e-29920efbadb4", "country": "a4841b05-3d0e-4015-9959-e34745d51cb2", "province": "e5a26705-ab46-4203-9fb3-5a93ddfe325c", "district": "240e4163-c561-4285-b740-26f00618f57b", "sector": "59203718-cc7c-47f8-a185-d5ad518a1c24", "code": "05050706", "name": "Nyakabungo" },
//     ...,
// ]

// make a function to merge the levels
function mergeLevels() {
    let result = countries.map(
        country => ({
            ...country,
            provinces: provinces.filter(province => province.country === country.id).map(
                province => ({
                    ...province,
                    districts: districts.filter(district => district.province === province.id).map(
                        district => ({
                            ...district,
                            sectors: sectors.filter(sector => sector.district === district.id).map(
                                sector => ({
                                    ...sector,
                                    cells: cells.filter(cell => cell.sector === sector.id)
                                })
                            )
                        })
                    )
                })
            )
        })
    )
    return result;
}

console.log(mergeLevels().filter(country => country.name === 'Rwanda'));

// write the result to a file
fs.writeFile('Rwanda.json', JSON.stringify(mergeLevels().filter(country => country.name === 'Rwanda')), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});