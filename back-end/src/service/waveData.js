const knex = require("../knex")
const { metersToFeet } = require("../utility.js")
const { isCurrentYear } = require("../utility.js")

// const id = '41004'

exports.fetchAndProccessData = async () => {
  //this is temporarily hard coded. the backslash after realtime is where the bouyid will go
  const fetchUrl = `https://www.ndbc.noaa.gov/data/realtime2/${id}.txt`
  console.log(`Fetching data from bouy : ${id}`)
  const fetchData = await fetch(fetchUrl)
  const textData = await fetchData.text()
  console.log(`Fetch from bouy ${id}, is complete`)
  //spliting the text data string into an array according to lines
  const rawArray = textData.split("\n")
  //divide by spaces
  const splitData = rawArray[0].split(" ")
  //removing blanks aka " "
  const labels = splitData.filter((char) => char !== " " && char !== "")
  console.log("Filtering Labels Complete")
  //delcare a temp matrix
  let rawDataMatrix = []
  //loop through the raw array starting at the numbers, to create a new array that will be pushed into the matrix
  for (let i = 2; i < rawArray.length; i++) {
    //split by spaces
    let splitRaw = rawArray[i].split(" ")
    //remove the blank strings
    let filterData = splitRaw.filter((char) => char !== " " && char !== "")
    //push in the filtered data
    rawDataMatrix.push(filterData)
  }
  console.log(`Removing spaces from data complete, bouy: ${id}`)
  // declare another matrix that will Only contain data points which include a measurement for wave hieght (index 9) and DPD (index 10)
  let sortedMatrix = []
  for (let i = 0; i < rawDataMatrix.length; i++) {
    let subArr = rawDataMatrix[i]
    if (
      subArr[9] !== "MM" &&
      subArr[10] !== "MM" &&
      parseInt(subArr[3]) < 20 &&
      subArr[5] !== "MM" &&
      parseInt(subArr[3]) >= 5
    ) {
      sortedMatrix.push(subArr)
    }
  }
  console.log(`Removing uneeded data entries is complete, bouy ${id}`)
  //This is the final matrix; this will hold the concated values
  let resultMatrix = []
  //basically, I am conncating
  for (let i = 0; i < sortedMatrix.length; i++) {
    let subArr = sortedMatrix[i]
    let bouyId = id
    let date = subArr[0] + "-" + subArr[1] + "-" + subArr[2]
    let time = subArr[3] + ":" + subArr[4]
    let wdir = subArr[5]
    let wspd = subArr[6]
    let gst = subArr[7]
    let wvht = metersToFeet(subArr[8])
    let dpd = subArr[9]
    let apd = subArr[10]
    let mwd = subArr[11]
    let pres = subArr[12]
    let concatArr = [
      bouyId,
      date,
      time,
      wdir,
      wspd,
      gst,
      wvht,
      dpd,
      apd,
      mwd,
      pres,
    ]
    resultMatrix.push(concatArr)
  }
  console.log(
    `Concating the data into a usable format is complete! bouy : ${id}`
  )
  try {
    for (const row of resultMatrix) {
      await knex("forty_five_day_cache").insert({
        bouy_id: row[0],
        record_date: row[1],
        record_time: row[2],
        WDIR: row[3],
        WSPD: row[4],
        GST: row[5],
        WVHT: row[6],
        DPD: row[7],
        APD: row[8],
        MWD: row[9],
        PRES: row[10],
      })
    }
    console.log(`completed insert, bouy ${id}`)
    return
  } catch (error) {
    console.error("error on insert:", error)
  }

  //    const returnData = await knex('forty_five_day_cache').select('*')

  //    return returnData
}

exports.updateCache = async (idArr) => {
  for (let i = 0; i < idArr.length; i++) {
    id = idArr[i]
    const fetchUrl = `https://www.ndbc.noaa.gov/data/realtime2/${id}.txt`
    const fetchData = await fetch(fetchUrl)
    const textData = await fetchData.text()
    console.log(`Data fetched Successfully for bouy: ${id}`)
    const splitDataArray = textData.split("\n")

    let resultMatrix = []

    for (let i = 2; i < splitDataArray.length; i++) {
      let row = splitDataArray[i].split(" ")
      let blanksRemovedRow = row.filter((char) => char !== " " && char !== "")
      if (
        blanksRemovedRow[9] !== "MM" &&
        blanksRemovedRow[10] !== "MM" &&
        parseInt(blanksRemovedRow[3]) < 20 &&
        blanksRemovedRow[5] !== "MM" &&
        parseInt(blanksRemovedRow[3]) >= 5
      ) {
        //do the concat here.
        let bouyId = id
        let date =
          blanksRemovedRow[0] +
          "-" +
          blanksRemovedRow[1] +
          "-" +
          blanksRemovedRow[2]
        let time = blanksRemovedRow[3] + ":" + blanksRemovedRow[4]
        let wdir = blanksRemovedRow[5]
        let wspd = blanksRemovedRow[6]
        let gst = blanksRemovedRow[7]
        let wvht = metersToFeet(blanksRemovedRow[8])
        let dpd = blanksRemovedRow[9]
        let apd = blanksRemovedRow[10]
        let mwd = blanksRemovedRow[11]
        let pres = blanksRemovedRow[12]
        let concatArr = [
          bouyId,
          date,
          time,
          wdir,
          wspd,
          gst,
          wvht,
          dpd,
          apd,
          mwd,
          pres,
        ]
        resultMatrix.push(concatArr)
      }
    }
    console.log("Sort and filter succesful for bouy:", id)

    try {
      const tableName = "forty_five_day_cache"
      //Update this so that that it only loops through the top 60 results..This will have to be done once app is deployed
      for (const row of resultMatrix) {
        await knex.raw(
          `
            INSERT IGNORE INTO ${tableName} (bouy_id, record_date, record_time, WDIR, WSPD,GST, WVHT, DPD, APD, MWD, PRES)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
          [
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6],
            row[7],
            row[8],
            row[9],
            row[10],
          ]
        )
      }

      console.log(`Adding Days to Cache Complete for Bouy: ${id}`)

      console.log(`Beginning Delete of out-of-date records for bouy: ${id}`)

      await knex.raw(
        `DELETE FROM ${tableName} WHERE record_date < DATE_SUB(NOW(), INTERVAL 45 DAY)`
      )

      console.log(`Delete of old records complete for bouy: ${id}`)
    } catch (error) {
      console.log("error on insert:", error)
    }
    // const splitBySpaces =
  } // const removeBlanks = splitDataArray.

  return
}

exports.retrieveCachedData = async (date, selectedBuoy) => {
  const result = await knex("forty_five_day_cache")
    .where("record_date", date)
    .where("bouy_id", selectedBuoy)
    .first()

  return result
}

exports.retrieveCurrentData = async (selectedBuoy) => {
  const fetchUrl = `https://www.ndbc.noaa.gov/data/realtime2/${selectedBuoy}.txt`
  const fetchData = await fetch(fetchUrl)
  const result = await fetchData.text()
  
  return result
}

exports.retrieveHistoricalData = async (selectedBuoy, month, year) => {
  let fetchUrl
  let fetchData
  let result

  if (isCurrentYear(year)) {
    //It is the current year, we need to fetch from the current year/monthly text files
    fetchUrl = `https://www.ndbc.noaa.gov/view_text_file.php?filename=${selectedBuoy}${month.monthNumber}${year}.txt.gz&dir=data/stdmet/${month.monthName}/`

    console.log(fetchUrl)
    fetchData = await fetch(fetchUrl)

    result = await fetchData.text()
    if (result.includes("Unable to access data file")) {
      //Try again, the month is within 45 days and the data is at a different URL
      fetchUrl = `https://www.ndbc.noaa.gov/data/stdmet/${month.monthName}/${selectedBuoy}.txt`
      console.log(fetchUrl)
      fetchData = await fetch(fetchUrl)
      result = await fetchData.text()
    }
  } else {
    //Fetch previous year, if available
    fetchUrl = `https://www.ndbc.noaa.gov/view_text_file.php?filename=${selectedBuoy}h${year}.txt.gz&dir=data/historical/stdmet/`
    console.log(fetchUrl)
    fetchData = await fetch(fetchUrl)
    result = await fetchData.text()
  
  }
  return result
}
