const cityData = {
  "new-york-ny": {
    "city": "New York",
    "state": "NY",
    "stateFullName": "New York",
    "index": 187,
    "rent1br": 3200,
    "rent2br": 4100,
    "medianIncome": 67046,
    "population": 8336817
  },
  "los-angeles-ca": {
    "city": "Los Angeles",
    "state": "CA",
    "stateFullName": "California",
    "index": 166,
    "rent1br": 2500,
    "rent2br": 3200,
    "medianIncome": 65290,
    "population": 3979576
  },
  "chicago-il": {
    "city": "Chicago",
    "state": "IL",
    "stateFullName": "Illinois",
    "index": 112,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 58984,
    "population": 2693976
  },
  "houston-tx": {
    "city": "Houston",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 99,
    "rent1br": 1400,
    "rent2br": 1800,
    "medianIncome": 56203,
    "population": 2320268
  },
  "phoenix-az": {
    "city": "Phoenix",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 105,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 59142,
    "population": 1581000
  },
  "philadelphia-pa": {
    "city": "Philadelphia",
    "state": "PA",
    "stateFullName": "Pennsylvania",
    "index": 113,
    "rent1br": 1650,
    "rent2br": 2100,
    "medianIncome": 55824,
    "population": 1603797
  },
  "san-antonio-tx": {
    "city": "San Antonio",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 95,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 52641,
    "population": 1547253
  },
  "san-diego-ca": {
    "city": "San Diego",
    "state": "CA",
    "stateFullName": "California",
    "index": 159,
    "rent1br": 2300,
    "rent2br": 2900,
    "medianIncome": 69845,
    "population": 1423851
  },
  "dallas-tx": {
    "city": "Dallas",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 102,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 61248,
    "population": 1343573
  },
  "san-jose-ca": {
    "city": "San Jose",
    "state": "CA",
    "stateFullName": "California",
    "index": 182,
    "rent1br": 2800,
    "rent2br": 3600,
    "medianIncome": 95634,
    "population": 1021795
  },
  "austin-tx": {
    "city": "Austin",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 121,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 71349,
    "population": 978908
  },
  "jacksonville-fl": {
    "city": "Jacksonville",
    "state": "FL",
    "stateFullName": "Florida",
    "index": 101,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 57320,
    "population": 968560
  },
  "fort-worth-tx": {
    "city": "Fort Worth",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 103,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 59874,
    "population": 909585
  },
  "columbus-oh": {
    "city": "Columbus",
    "state": "OH",
    "stateFullName": "Ohio",
    "index": 99,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 56102,
    "population": 898553
  },
  "indianapolis-in": {
    "city": "Indianapolis",
    "state": "IN",
    "stateFullName": "Indiana",
    "index": 94,
    "rent1br": 1200,
    "rent2br": 1550,
    "medianIncome": 53987,
    "population": 876384
  },
  "charlotte-nc": {
    "city": "Charlotte",
    "state": "NC",
    "stateFullName": "North Carolina",
    "index": 108,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 61340,
    "population": 885708
  },
  "denver-co": {
    "city": "Denver",
    "state": "CO",
    "stateFullName": "Colorado",
    "index": 129,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 69452,
    "population": 727211
  },
  "seattle-wa": {
    "city": "Seattle",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 147,
    "rent1br": 2100,
    "rent2br": 2700,
    "medianIncome": 78340,
    "population": 753675
  },
  "boston-ma": {
    "city": "Boston",
    "state": "MA",
    "stateFullName": "Massachusetts",
    "index": 158,
    "rent1br": 2250,
    "rent2br": 2850,
    "medianIncome": 76321,
    "population": 692600
  },
  "el-paso-tx": {
    "city": "El Paso",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 88,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 48365,
    "population": 678815
  },
  "nashville-tn": {
    "city": "Nashville",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 59234,
    "population": 715884
  },
  "detroit-mi": {
    "city": "Detroit",
    "state": "MI",
    "stateFullName": "Michigan",
    "index": 88,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 44823,
    "population": 639111
  },
  "oklahoma-city-ok": {
    "city": "Oklahoma City",
    "state": "OK",
    "stateFullName": "Oklahoma",
    "index": 91,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 52348,
    "population": 649380
  },
  "portland-or": {
    "city": "Portland",
    "state": "OR",
    "stateFullName": "Oregon",
    "index": 132,
    "rent1br": 1900,
    "rent2br": 2450,
    "medianIncome": 66789,
    "population": 652503
  },
  "las-vegas-nv": {
    "city": "Las Vegas",
    "state": "NV",
    "stateFullName": "Nevada",
    "index": 108,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 59234,
    "population": 623747
  },
  "memphis-tn": {
    "city": "Memphis",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 89,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 46123,
    "population": 633104
  },
  "louisville-ky": {
    "city": "Louisville",
    "state": "KY",
    "stateFullName": "Kentucky",
    "index": 95,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 53456,
    "population": 633045
  },
  "baltimore-md": {
    "city": "Baltimore",
    "state": "MD",
    "stateFullName": "Maryland",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 54328,
    "population": 585708
  },
  "milwaukee-wi": {
    "city": "Milwaukee",
    "state": "WI",
    "stateFullName": "Wisconsin",
    "index": 96,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 51234,
    "population": 577222
  },
  "albuquerque-nm": {
    "city": "Albuquerque",
    "state": "NM",
    "stateFullName": "New Mexico",
    "index": 98,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 54123,
    "population": 564559
  },
  "tucson-az": {
    "city": "Tucson",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 99,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 52456,
    "population": 525796
  },
  "fresno-ca": {
    "city": "Fresno",
    "state": "CA",
    "stateFullName": "California",
    "index": 123,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 56234,
    "population": 535007
  },
  "sacramento-ca": {
    "city": "Sacramento",
    "state": "CA",
    "stateFullName": "California",
    "index": 141,
    "rent1br": 1950,
    "rent2br": 2550,
    "medianIncome": 63456,
    "population": 525453
  },
  "long-beach-ca": {
    "city": "Long Beach",
    "state": "CA",
    "stateFullName": "California",
    "index": 164,
    "rent1br": 2400,
    "rent2br": 3100,
    "medianIncome": 68234,
    "population": 466742
  },
  "kansas-city-mo": {
    "city": "Kansas City",
    "state": "MO",
    "stateFullName": "Missouri",
    "index": 98,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 55234,
    "population": 508090
  },
  "mesa-az": {
    "city": "Mesa",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 58234,
    "population": 457587
  },
  "virginia-beach-va": {
    "city": "Virginia Beach",
    "state": "VA",
    "stateFullName": "Virginia",
    "index": 112,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 67234,
    "population": 459841
  },
  "atlanta-ga": {
    "city": "Atlanta",
    "state": "GA",
    "stateFullName": "Georgia",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 62348,
    "population": 498044
  },
  "colorado-springs-co": {
    "city": "Colorado Springs",
    "state": "CO",
    "stateFullName": "Colorado",
    "index": 120,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 63234,
    "population": 478961
  },
  "omaha-ne": {
    "city": "Omaha",
    "state": "NE",
    "stateFullName": "Nebraska",
    "index": 95,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 55234,
    "population": 468062
  },
  "miami-fl": {
    "city": "Miami",
    "state": "FL",
    "stateFullName": "Florida",
    "index": 125,
    "rent1br": 1800,
    "rent2br": 2350,
    "medianIncome": 58234,
    "population": 442241
  },
  "tulsa-ok": {
    "city": "Tulsa",
    "state": "OK",
    "stateFullName": "Oklahoma",
    "index": 90,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 51234,
    "population": 413066
  },
  "oakland-ca": {
    "city": "Oakland",
    "state": "CA",
    "stateFullName": "California",
    "index": 154,
    "rent1br": 2150,
    "rent2br": 2750,
    "medianIncome": 67234,
    "population": 433656
  },
  "minneapolis-mn": {
    "city": "Minneapolis",
    "state": "MN",
    "stateFullName": "Minnesota",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 62456,
    "population": 429954
  },
  "wichita-ks": {
    "city": "Wichita",
    "state": "KS",
    "stateFullName": "Kansas",
    "index": 89,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 51234,
    "population": 389965
  },
  "arlington-tx": {
    "city": "Arlington",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 105,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 62345,
    "population": 398854
  },
  "new-orleans-la": {
    "city": "New Orleans",
    "state": "LA",
    "stateFullName": "Louisiana",
    "index": 102,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 48234,
    "population": 391006
  },
  "bakersfield-ca": {
    "city": "Bakersfield",
    "state": "CA",
    "stateFullName": "California",
    "index": 119,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 54234,
    "population": 403455
  },
  "tampa-fl": {
    "city": "Tampa",
    "state": "FL",
    "stateFullName": "Florida",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 57234,
    "population": 399700
  },
  "aurora-co": {
    "city": "Aurora",
    "state": "CO",
    "stateFullName": "Colorado",
    "index": 118,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 61234,
    "population": 386261
  },
  "honolulu-hi": {
    "city": "Honolulu",
    "state": "HI",
    "stateFullName": "Hawaii",
    "index": 189,
    "rent1br": 3350,
    "rent2br": 4300,
    "medianIncome": 74123,
    "population": 345975
  },
  "anaheim-ca": {
    "city": "Anaheim",
    "state": "CA",
    "stateFullName": "California",
    "index": 151,
    "rent1br": 2100,
    "rent2br": 2700,
    "medianIncome": 66234,
    "population": 346824
  },
  "saint-louis-mo": {
    "city": "Saint Louis",
    "state": "MO",
    "stateFullName": "Missouri",
    "index": 94,
    "rent1br": 1200,
    "rent2br": 1550,
    "medianIncome": 50234,
    "population": 301578
  },
  "lexington-ky": {
    "city": "Lexington",
    "state": "KY",
    "stateFullName": "Kentucky",
    "index": 98,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 56234,
    "population": 321959
  },
  "henderson-nv": {
    "city": "Henderson",
    "state": "NV",
    "stateFullName": "Nevada",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 61234,
    "population": 320189
  },
  "plano-tx": {
    "city": "Plano",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 108,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 72456,
    "population": 308271
  },
  "orlando-fl": {
    "city": "Orlando",
    "state": "FL",
    "stateFullName": "Florida",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 58234,
    "population": 307573
  },
  "chula-vista-ca": {
    "city": "Chula Vista",
    "state": "CA",
    "stateFullName": "California",
    "index": 155,
    "rent1br": 2200,
    "rent2br": 2800,
    "medianIncome": 65234,
    "population": 275769
  },
  "irving-tx": {
    "city": "Irving",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 61234,
    "population": 242259
  },
  "laredo-tx": {
    "city": "Laredo",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 85,
    "rent1br": 1000,
    "rent2br": 1300,
    "medianIncome": 47234,
    "population": 255205
  },
  "madison-wi": {
    "city": "Madison",
    "state": "WI",
    "stateFullName": "Wisconsin",
    "index": 103,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 57456,
    "population": 269840
  },
  "glendale-az": {
    "city": "Glendale",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 103,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 58234,
    "population": 252381
  },
  "baton-rouge-la": {
    "city": "Baton Rouge",
    "state": "LA",
    "stateFullName": "Louisiana",
    "index": 96,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 50234,
    "population": 227818
  },
  "garland-tx": {
    "city": "Garland",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 103,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 59234,
    "population": 239928
  },
  "glendale-ca": {
    "city": "Glendale",
    "state": "CA",
    "stateFullName": "California",
    "index": 146,
    "rent1br": 2000,
    "rent2br": 2600,
    "medianIncome": 61234,
    "population": 203054
  },
  "gilbert-az": {
    "city": "Gilbert",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 71456,
    "population": 267918
  },
  "stockton-ca": {
    "city": "Stockton",
    "state": "CA",
    "stateFullName": "California",
    "index": 128,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 53234,
    "population": 330556
  },
  "huntington-beach-ca": {
    "city": "Huntington Beach",
    "state": "CA",
    "stateFullName": "California",
    "index": 168,
    "rent1br": 2600,
    "rent2br": 3350,
    "medianIncome": 72345,
    "population": 198397
  },
  "santa-ana-ca": {
    "city": "Santa Ana",
    "state": "CA",
    "stateFullName": "California",
    "index": 152,
    "rent1br": 2150,
    "rent2br": 2750,
    "medianIncome": 58234,
    "population": 310127
  },
  "modesto-ca": {
    "city": "Modesto",
    "state": "CA",
    "stateFullName": "California",
    "index": 125,
    "rent1br": 1800,
    "rent2br": 2350,
    "medianIncome": 54234,
    "population": 229286
  },
  "fontana-ca": {
    "city": "Fontana",
    "state": "CA",
    "stateFullName": "California",
    "index": 134,
    "rent1br": 1900,
    "rent2br": 2450,
    "medianIncome": 56234,
    "population": 208393
  },
  "moreno-valley-ca": {
    "city": "Moreno Valley",
    "state": "CA",
    "stateFullName": "California",
    "index": 133,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 57234,
    "population": 218812
  },
  "fremont-ca": {
    "city": "Fremont",
    "state": "CA",
    "stateFullName": "California",
    "index": 179,
    "rent1br": 2750,
    "rent2br": 3550,
    "medianIncome": 91234,
    "population": 239102
  },
  "brownsville-tx": {
    "city": "Brownsville",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 85,
    "rent1br": 1000,
    "rent2br": 1300,
    "medianIncome": 45234,
    "population": 183046
  },
  "shreveport-la": {
    "city": "Shreveport",
    "state": "LA",
    "stateFullName": "Louisiana",
    "index": 91,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 47234,
    "population": 173602
  },
  "oceanside-ca": {
    "city": "Oceanside",
    "state": "CA",
    "stateFullName": "California",
    "index": 156,
    "rent1br": 2250,
    "rent2br": 2850,
    "medianIncome": 64234,
    "population": 174968
  },
  "ontario-ca": {
    "city": "Ontario",
    "state": "CA",
    "stateFullName": "California",
    "index": 137,
    "rent1br": 1950,
    "rent2br": 2550,
    "medianIncome": 57234,
    "population": 171446
  },
  "vancouver-wa": {
    "city": "Vancouver",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 127,
    "rent1br": 1800,
    "rent2br": 2350,
    "medianIncome": 63234,
    "population": 190915
  },
  "irvine-ca": {
    "city": "Irvine",
    "state": "CA",
    "stateFullName": "California",
    "index": 158,
    "rent1br": 2350,
    "rent2br": 2950,
    "medianIncome": 88234,
    "population": 287401
  },
  "riverside-ca": {
    "city": "Riverside",
    "state": "CA",
    "stateFullName": "California",
    "index": 135,
    "rent1br": 1900,
    "rent2br": 2450,
    "medianIncome": 57234,
    "population": 314998
  },
  "corpus-christi-tx": {
    "city": "Corpus Christi",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 92,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 50234,
    "population": 317863
  },
  "cincinnati-oh": {
    "city": "Cincinnati",
    "state": "OH",
    "stateFullName": "Ohio",
    "index": 100,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 55234,
    "population": 305902
  },
  "greensboro-nc": {
    "city": "Greensboro",
    "state": "NC",
    "stateFullName": "North Carolina",
    "index": 105,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 56234,
    "population": 285127
  },
  "newark-nj": {
    "city": "Newark",
    "state": "NJ",
    "stateFullName": "New Jersey",
    "index": 124,
    "rent1br": 1750,
    "rent2br": 2300,
    "medianIncome": 52234,
    "population": 282090
  },
  "buffalo-ny": {
    "city": "Buffalo",
    "state": "NY",
    "stateFullName": "New York",
    "index": 102,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 48234,
    "population": 252399
  },
  "saint-paul-mn": {
    "city": "Saint Paul",
    "state": "MN",
    "stateFullName": "Minnesota",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 61234,
    "population": 305950
  },
  "fort-wayne-in": {
    "city": "Fort Wayne",
    "state": "IN",
    "stateFullName": "Indiana",
    "index": 92,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 51234,
    "population": 268337
  },
  "anchorage-ak": {
    "city": "Anchorage",
    "state": "AK",
    "stateFullName": "Alaska",
    "index": 171,
    "rent1br": 2450,
    "rent2br": 3150,
    "medianIncome": 73456,
    "population": 290797
  },
  "jersey-city-nj": {
    "city": "Jersey City",
    "state": "NJ",
    "stateFullName": "New Jersey",
    "index": 128,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 59234,
    "population": 263379
  },
  "durham-nc": {
    "city": "Durham",
    "state": "NC",
    "stateFullName": "North Carolina",
    "index": 112,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 62345,
    "population": 278884
  },
  "raleigh-nc": {
    "city": "Raleigh",
    "state": "NC",
    "stateFullName": "North Carolina",
    "index": 113,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 63456,
    "population": 467665
  },
  "winston-salem-nc": {
    "city": "Winston-Salem",
    "state": "NC",
    "stateFullName": "North Carolina",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 54234,
    "population": 247945
  },
  "north-las-vegas-nv": {
    "city": "North Las Vegas",
    "state": "NV",
    "stateFullName": "Nevada",
    "index": 106,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 58234,
    "population": 263877
  },
  "richmond-va": {
    "city": "Richmond",
    "state": "VA",
    "stateFullName": "Virginia",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 57234,
    "population": 226610
  },
  "san-bernardino-ca": {
    "city": "San Bernardino",
    "state": "CA",
    "stateFullName": "California",
    "index": 130,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 53234,
    "population": 232164
  },
  "birmingham-al": {
    "city": "Birmingham",
    "state": "AL",
    "stateFullName": "Alabama",
    "index": 93,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 49234,
    "population": 214237
  },
  "toledo-oh": {
    "city": "Toledo",
    "state": "OH",
    "stateFullName": "Ohio",
    "index": 93,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 49234,
    "population": 270871
  },
  "huntsville-al": {
    "city": "Huntsville",
    "state": "AL",
    "stateFullName": "Alabama",
    "index": 101,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 61234,
    "population": 215006
  },
  "chandler-az": {
    "city": "Chandler",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 70234,
    "population": 275987
  },
  "san-francisco-ca": {
    "city": "San Francisco",
    "state": "CA",
    "stateFullName": "California",
    "index": 191,
    "rent1br": 3400,
    "rent2br": 4400,
    "medianIncome": 92345,
    "population": 815201
  },
  "little-rock-ar": {
    "city": "Little Rock",
    "state": "AR",
    "stateFullName": "Arkansas",
    "index": 92,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 50234,
    "population": 196537
  },
  "scottsdale-az": {
    "city": "Scottsdale",
    "state": "AZ",
    "stateFullName": "Arizona",
    "index": 143,
    "rent1br": 1950,
    "rent2br": 2550,
    "medianIncome": 79456,
    "population": 258069
  },
  "aurora-il": {
    "city": "Aurora",
    "state": "IL",
    "stateFullName": "Illinois",
    "index": 113,
    "rent1br": 1650,
    "rent2br": 2100,
    "medianIncome": 59234,
    "population": 197899
  },
  "key-west-fl": {
    "city": "Key West",
    "state": "FL",
    "stateFullName": "Florida",
    "index": 168,
    "rent1br": 2450,
    "rent2br": 3150,
    "medianIncome": 55234,
    "population": 25476
  },
  "savannah-ga": {
    "city": "Savannah",
    "state": "GA",
    "stateFullName": "Georgia",
    "index": 107,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 56234,
    "population": 147780
  },
  "des-moines-ia": {
    "city": "Des Moines",
    "state": "IA",
    "stateFullName": "Iowa",
    "index": 97,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 55234,
    "population": 210330
  },
  "boise-id": {
    "city": "Boise",
    "state": "ID",
    "stateFullName": "Idaho",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 60234,
    "population": 235684
  },
  "coeur-d-alene-id": {
    "city": "Coeur d'Alene",
    "state": "ID",
    "stateFullName": "Idaho",
    "index": 118,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 56234,
    "population": 54763
  },
  "springfield-il": {
    "city": "Springfield",
    "state": "IL",
    "stateFullName": "Illinois",
    "index": 96,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 52234,
    "population": 114394
  },
  "rockford-il": {
    "city": "Rockford",
    "state": "IL",
    "stateFullName": "Illinois",
    "index": 95,
    "rent1br": 1200,
    "rent2br": 1550,
    "medianIncome": 50234,
    "population": 142591
  },
  "peoria-il": {
    "city": "Peoria",
    "state": "IL",
    "stateFullName": "Illinois",
    "index": 95,
    "rent1br": 1200,
    "rent2br": 1550,
    "medianIncome": 50234,
    "population": 112936
  },
  "south-bend-in": {
    "city": "South Bend",
    "state": "IN",
    "stateFullName": "Indiana",
    "index": 91,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 49234,
    "population": 101168
  },
  "evansville-in": {
    "city": "Evansville",
    "state": "IN",
    "stateFullName": "Indiana",
    "index": 89,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 48234,
    "population": 117649
  },
  "topeka-ks": {
    "city": "Topeka",
    "state": "KS",
    "stateFullName": "Kansas",
    "index": 91,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 51234,
    "population": 125310
  },
  "kansas-city-ks": {
    "city": "Kansas City",
    "state": "KS",
    "stateFullName": "Kansas",
    "index": 93,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 52234,
    "population": 150452
  },
  "rochester-ny": {
    "city": "Rochester",
    "state": "NY",
    "stateFullName": "New York",
    "index": 103,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 52234,
    "population": 205362
  },
  "yonkers-ny": {
    "city": "Yonkers",
    "state": "NY",
    "stateFullName": "New York",
    "index": 155,
    "rent1br": 2200,
    "rent2br": 2800,
    "medianIncome": 58234,
    "population": 211569
  },
  "albany-ny": {
    "city": "Albany",
    "state": "NY",
    "stateFullName": "New York",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 55234,
    "population": 98424
  },
  "syracuse-ny": {
    "city": "Syracuse",
    "state": "NY",
    "stateFullName": "New York",
    "index": 101,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 51234,
    "population": 144226
  },
  "rochester-mn": {
    "city": "Rochester",
    "state": "MN",
    "stateFullName": "Minnesota",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 62345,
    "population": 126417
  },
  "st-cloud-mn": {
    "city": "St. Cloud",
    "state": "MN",
    "stateFullName": "Minnesota",
    "index": 105,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 57234,
    "population": 68881
  },
  "duluth-mn": {
    "city": "Duluth",
    "state": "MN",
    "stateFullName": "Minnesota",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 54234,
    "population": 87923
  },
  "jackson-ms": {
    "city": "Jackson",
    "state": "MS",
    "stateFullName": "Mississippi",
    "index": 90,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 47234,
    "population": 150437
  },
  "gulfport-ms": {
    "city": "Gulfport",
    "state": "MS",
    "stateFullName": "Mississippi",
    "index": 92,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 48234,
    "population": 72404
  },
  "billings-mt": {
    "city": "Billings",
    "state": "MT",
    "stateFullName": "Montana",
    "index": 108,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 57234,
    "population": 130851
  },
  "missoula-mt": {
    "city": "Missoula",
    "state": "MT",
    "stateFullName": "Montana",
    "index": 114,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 56234,
    "population": 74962
  },
  "great-falls-mt": {
    "city": "Great Falls",
    "state": "MT",
    "stateFullName": "Montana",
    "index": 106,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 54234,
    "population": 58505
  },
  "lincoln-ne": {
    "city": "Lincoln",
    "state": "NE",
    "stateFullName": "Nebraska",
    "index": 96,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 56234,
    "population": 284736
  },
  "grand-prairie-tx": {
    "city": "Grand Prairie",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 61234,
    "population": 188373
  },
  "mcallen-tx": {
    "city": "McAllen",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 84,
    "rent1br": 950,
    "rent2br": 1250,
    "medianIncome": 44234,
    "population": 140927
  },
  "edinburg-tx": {
    "city": "Edinburg",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 85,
    "rent1br": 1000,
    "rent2br": 1300,
    "medianIncome": 45234,
    "population": 90114
  },
  "mission-tx": {
    "city": "Mission",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 84,
    "rent1br": 950,
    "rent2br": 1250,
    "medianIncome": 43234,
    "population": 85329
  },
  "pharr-tx": {
    "city": "Pharr",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 84,
    "rent1br": 950,
    "rent2br": 1250,
    "medianIncome": 42234,
    "population": 81140
  },
  "lubbock-tx": {
    "city": "Lubbock",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 89,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 49234,
    "population": 255885
  },
  "midland-tx": {
    "city": "Midland",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 101,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 63456,
    "population": 151186
  },
  "odessa-tx": {
    "city": "Odessa",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 98,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 59234,
    "population": 159436
  },
  "amarillo-tx": {
    "city": "Amarillo",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 91,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 54234,
    "population": 199371
  },
  "abilene-tx": {
    "city": "Abilene",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 90,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 51234,
    "population": 128139
  },
  "san-angelo-tx": {
    "city": "San Angelo",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 89,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 50234,
    "population": 100145
  },
  "victoria-tx": {
    "city": "Victoria",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 88,
    "rent1br": 1000,
    "rent2br": 1300,
    "medianIncome": 49234,
    "population": 67325
  },
  "beaumont-tx": {
    "city": "Beaumont",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 90,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 50234,
    "population": 115282
  },
  "port-arthur-tx": {
    "city": "Port Arthur",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 89,
    "rent1br": 1000,
    "rent2br": 1300,
    "medianIncome": 48234,
    "population": 54112
  },
  "galveston-tx": {
    "city": "Galveston",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 107,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 52234,
    "population": 50181
  },
  "pearland-tx": {
    "city": "Pearland",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 68456,
    "population": 120722
  },
  "katy-tx": {
    "city": "Katy",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 112,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 69234,
    "population": 83578
  },
  "sugar-land-tx": {
    "city": "Sugar Land",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 113,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 70456,
    "population": 118751
  },
  "grapevine-tx": {
    "city": "Grapevine",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 62345,
    "population": 55157
  },
  "frisco-tx": {
    "city": "Frisco",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 114,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 72456,
    "population": 184246
  },
  "mckinney-tx": {
    "city": "McKinney",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 68234,
    "population": 184246
  },
  "lewisville-tx": {
    "city": "Lewisville",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 107,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 62234,
    "population": 116645
  },
  "denton-tx": {
    "city": "Denton",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 106,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 58234,
    "population": 143126
  },
  "carrollton-tx": {
    "city": "Carrollton",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 105,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 61234,
    "population": 128126
  },
  "flower-mound-tx": {
    "city": "Flower Mound",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 118,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 71456,
    "population": 80632
  },
  "coppell-tx": {
    "city": "Coppell",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 116,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 70234,
    "population": 41808
  },
  "mcallen-texas-tx": {
    "city": "McAllen",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 84,
    "rent1br": 950,
    "rent2br": 1250,
    "medianIncome": 44234,
    "population": 140927
  },
  "rockport-tx": {
    "city": "Rockport",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 94,
    "rent1br": 1200,
    "rent2br": 1550,
    "medianIncome": 49234,
    "population": 8563
  },
  "baytown-tx": {
    "city": "Baytown",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 101,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 55234,
    "population": 75806
  },
  "pasadena-tx": {
    "city": "Pasadena",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 102,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 55234,
    "population": 158370
  },
  "seabrook-tx": {
    "city": "Seabrook",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 107,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 61234,
    "population": 12618
  },
  "texas-city-tx": {
    "city": "Texas City",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 97,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 51234,
    "population": 45099
  },
  "webster-tx": {
    "city": "Webster",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 63456,
    "population": 11081
  },
  "friendswood-tx": {
    "city": "Friendswood",
    "state": "TX",
    "stateFullName": "Texas",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 64234,
    "population": 39594
  },
  "visalia-ca": {
    "city": "Visalia",
    "state": "CA",
    "stateFullName": "California",
    "index": 121,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 53234,
    "population": 141205
  },
  "tulare-ca": {
    "city": "Tulare",
    "state": "CA",
    "stateFullName": "California",
    "index": 118,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 51234,
    "population": 73976
  },
  "hanford-ca": {
    "city": "Hanford",
    "state": "CA",
    "stateFullName": "California",
    "index": 119,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 52234,
    "population": 57169
  },
  "delano-ca": {
    "city": "Delano",
    "state": "CA",
    "stateFullName": "California",
    "index": 117,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 49234,
    "population": 50662
  },
  "merced-ca": {
    "city": "Merced",
    "state": "CA",
    "stateFullName": "California",
    "index": 120,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 51234,
    "population": 82472
  },
  "madera-ca": {
    "city": "Madera",
    "state": "CA",
    "stateFullName": "California",
    "index": 119,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 50234,
    "population": 64975
  },
  "redding-ca": {
    "city": "Redding",
    "state": "CA",
    "stateFullName": "California",
    "index": 112,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 50234,
    "population": 91638
  },
  "chico-ca": {
    "city": "Chico",
    "state": "CA",
    "stateFullName": "California",
    "index": 115,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 51234,
    "population": 92155
  },
  "yuba-city-ca": {
    "city": "Yuba City",
    "state": "CA",
    "stateFullName": "California",
    "index": 120,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 51234,
    "population": 67141
  },
  "victorville-ca": {
    "city": "Victorville",
    "state": "CA",
    "stateFullName": "California",
    "index": 122,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 54234,
    "population": 134810
  },
  "reno-nv": {
    "city": "Reno",
    "state": "NV",
    "stateFullName": "Nevada",
    "index": 125,
    "rent1br": 1800,
    "rent2br": 2350,
    "medianIncome": 62456,
    "population": 258960
  },
  "carson-city-nv": {
    "city": "Carson City",
    "state": "NV",
    "stateFullName": "Nevada",
    "index": 118,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 57234,
    "population": 58639
  },
  "hendersonville-tn": {
    "city": "Hendersonville",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 108,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 62345,
    "population": 60717
  },
  "jackson-tn": {
    "city": "Jackson",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 95,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 49234,
    "population": 66231
  },
  "clarksville-tn": {
    "city": "Clarksville",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 100,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 54234,
    "population": 168278
  },
  "murfreesboro-tn": {
    "city": "Murfreesboro",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 55234,
    "population": 152769
  },
  "knoxville-tn": {
    "city": "Knoxville",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 103,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 54234,
    "population": 187603
  },
  "chattanooga-tn": {
    "city": "Chattanooga",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 102,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 52234,
    "population": 181099
  },
  "johnson-city-tn": {
    "city": "Johnson City",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 99,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 51234,
    "population": 71148
  },
  "kingsport-tn": {
    "city": "Kingsport",
    "state": "TN",
    "stateFullName": "Tennessee",
    "index": 100,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 51234,
    "population": 53754
  },
  "biloxi-ms": {
    "city": "Biloxi",
    "state": "MS",
    "stateFullName": "Mississippi",
    "index": 95,
    "rent1br": 1250,
    "rent2br": 1650,
    "medianIncome": 49234,
    "population": 46237
  },
  "hattiesburg-ms": {
    "city": "Hattiesburg",
    "state": "MS",
    "stateFullName": "Mississippi",
    "index": 91,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 47234,
    "population": 51271
  },
  "starkville-ms": {
    "city": "Starkville",
    "state": "MS",
    "stateFullName": "Mississippi",
    "index": 92,
    "rent1br": 1150,
    "rent2br": 1500,
    "medianIncome": 48234,
    "population": 26476
  },
  "myrtle-beach-sc": {
    "city": "Myrtle Beach",
    "state": "SC",
    "stateFullName": "South Carolina",
    "index": 119,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 56234,
    "population": 34423
  },
  "portland-me": {
    "city": "Portland",
    "state": "ME",
    "stateFullName": "Maine",
    "index": 119,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 59234,
    "population": 68408
  },
  "lewiston-me": {
    "city": "Lewiston",
    "state": "ME",
    "stateFullName": "Maine",
    "index": 112,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 52234,
    "population": 36592
  },
  "manchester-nh": {
    "city": "Manchester",
    "state": "NH",
    "stateFullName": "New Hampshire",
    "index": 120,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 60234,
    "population": 115644
  },
  "nashua-nh": {
    "city": "Nashua",
    "state": "NH",
    "stateFullName": "New Hampshire",
    "index": 121,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 61234,
    "population": 91322
  },
  "concord-nh": {
    "city": "Concord",
    "state": "NH",
    "stateFullName": "New Hampshire",
    "index": 118,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 58234,
    "population": 44292
  },
  "bismarck-nd": {
    "city": "Bismarck",
    "state": "ND",
    "stateFullName": "North Dakota",
    "index": 100,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 59234,
    "population": 73529
  },
  "fargo-nd": {
    "city": "Fargo",
    "state": "ND",
    "stateFullName": "North Dakota",
    "index": 105,
    "rent1br": 1450,
    "rent2br": 1900,
    "medianIncome": 62456,
    "population": 140576
  },
  "providence-ri": {
    "city": "Providence",
    "state": "RI",
    "stateFullName": "Rhode Island",
    "index": 124,
    "rent1br": 1750,
    "rent2br": 2300,
    "medianIncome": 54234,
    "population": 177994
  },
  "warwick-ri": {
    "city": "Warwick",
    "state": "RI",
    "stateFullName": "Rhode Island",
    "index": 121,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 56234,
    "population": 81971
  },
  "charleston-sc": {
    "city": "Charleston",
    "state": "SC",
    "stateFullName": "South Carolina",
    "index": 118,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 58234,
    "population": 150227
  },
  "columbia-sc": {
    "city": "Columbia",
    "state": "SC",
    "stateFullName": "South Carolina",
    "index": 109,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 54234,
    "population": 127029
  },
  "greenville-sc": {
    "city": "Greenville",
    "state": "SC",
    "stateFullName": "South Carolina",
    "index": 111,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 56234,
    "population": 70720
  },
  "sioux-falls-sd": {
    "city": "Sioux Falls",
    "state": "SD",
    "stateFullName": "South Dakota",
    "index": 103,
    "rent1br": 1350,
    "rent2br": 1750,
    "medianIncome": 57234,
    "population": 194110
  },
  "rapid-city-sd": {
    "city": "Rapid City",
    "state": "SD",
    "stateFullName": "South Dakota",
    "index": 104,
    "rent1br": 1400,
    "rent2br": 1850,
    "medianIncome": 55234,
    "population": 77313
  },
  "salt-lake-city-ut": {
    "city": "Salt Lake City",
    "state": "UT",
    "stateFullName": "Utah",
    "index": 122,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 63456,
    "population": 199723
  },
  "ogden-ut": {
    "city": "Ogden",
    "state": "UT",
    "stateFullName": "Utah",
    "index": 110,
    "rent1br": 1550,
    "rent2br": 2000,
    "medianIncome": 57234,
    "population": 87321
  },
  "provo-ut": {
    "city": "Provo",
    "state": "UT",
    "stateFullName": "Utah",
    "index": 114,
    "rent1br": 1700,
    "rent2br": 2200,
    "medianIncome": 60234,
    "population": 123530
  },
  "burlington-vt": {
    "city": "Burlington",
    "state": "VT",
    "stateFullName": "Vermont",
    "index": 123,
    "rent1br": 1750,
    "rent2br": 2300,
    "medianIncome": 61234,
    "population": 45078
  },
  "montpelier-vt": {
    "city": "Montpelier",
    "state": "VT",
    "stateFullName": "Vermont",
    "index": 119,
    "rent1br": 1650,
    "rent2br": 2150,
    "medianIncome": 57234,
    "population": 7838
  },
  "charleston-wv": {
    "city": "Charleston",
    "state": "WV",
    "stateFullName": "West Virginia",
    "index": 90,
    "rent1br": 1100,
    "rent2br": 1450,
    "medianIncome": 47234,
    "population": 46539
  },
  "huntington-wv": {
    "city": "Huntington",
    "state": "WV",
    "stateFullName": "West Virginia",
    "index": 88,
    "rent1br": 1050,
    "rent2br": 1350,
    "medianIncome": 45234,
    "population": 46842
  },
  "cheyenne-wy": {
    "city": "Cheyenne",
    "state": "WY",
    "stateFullName": "Wyoming",
    "index": 99,
    "rent1br": 1300,
    "rent2br": 1700,
    "medianIncome": 58234,
    "population": 65132
  },
  "laramie-wy": {
    "city": "Laramie",
    "state": "WY",
    "stateFullName": "Wyoming",
    "index": 107,
    "rent1br": 1500,
    "rent2br": 1950,
    "medianIncome": 54234,
    "population": 32434
  },
  "spokane-wa": {
    "city": "Spokane",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 117,
    "rent1br": 1600,
    "rent2br": 2050,
    "medianIncome": 56234,
    "population": 228989
  },
  "tacoma-wa": {
    "city": "Tacoma",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 131,
    "rent1br": 1900,
    "rent2br": 2450,
    "medianIncome": 62345,
    "population": 220778
  },
  "bellingham-wa": {
    "city": "Bellingham",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 127,
    "rent1br": 1800,
    "rent2br": 2350,
    "medianIncome": 59234,
    "population": 92061
  },
  "everett-wa": {
    "city": "Everett",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 128,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 60234,
    "population": 110629
  },
  "kent-wa": {
    "city": "Kent",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 129,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 61234,
    "population": 133930
  },
  "renton-wa": {
    "city": "Renton",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 132,
    "rent1br": 1900,
    "rent2br": 2450,
    "medianIncome": 65234,
    "population": 110927
  },
  "federal-way-wa": {
    "city": "Federal Way",
    "state": "WA",
    "stateFullName": "Washington",
    "index": 128,
    "rent1br": 1850,
    "rent2br": 2400,
    "medianIncome": 60234,
    "population": 100608
  }
};

module.exports = cityData;