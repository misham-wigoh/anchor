/* All content below is taken from the Anchor Capital brief files (ANCHOR CAPITAL WEBSITE zip + dashboard .odg).
   Market numbers come from the client's screenshots and are a SAMPLE SNAPSHOT, not live quotes. */
window.AC = {
  contact: {
    name: 'P. Rengasamy',
    phone: '+91 90038 13366', phoneRaw: '+919003813366',
    email: 'rengasamyperumal57@gmail.com',
    address: 'F2, Lakshmi Home, No. 7, Kannan Nagar C, Camp Road, Selaiyur, Chennai – 600073'
  },

  /* HOME – market summary (HOME.png) */
  summary: { advance: 3647, decline: 1924, unchanged: 1592, high52: 131, low52: 24 },

  ticker: [
    ['HDFCBANK', 708.25, 2.08], ['YESBANK', 23.48, 5.29], ['INFY', 1037.70, .12], ['TCS', 2200.80, -.15], ['ITC', 259.85, .21],
    ['KOTAKBANK', 419.00, .59], ['WIPRO', 167.40, .66], ['BHARTIARTL', 1831.10, -.43], ['LT', 3930.70, -.61], ['M&M', 3107.00, -.54],
    ['ICICIBANK', 1379.30, -.38], ['AXISBANK', 1246.00, 0], ['TITAN', 5009.50, -.23], ['INDIGO', 4973.00, .57], ['BEL', 404.35, -.16]
  ],

  /* BIG TRADE LIST.png – heat-map snapshot: [symbol, price, %change] */
  heat: [
    ['YESBANK', 23.48, 5.29], ['INDUSTOWER', 388, 4.30], ['PAYTM', 1807.5, 3.94], ['WAAREEENER', 2625, 3.02], ['BLUESTARCO', 1558, 2.91], ['ANGELONE', 305, 2.59], ['BSE', 3384, 2.36], ['HDFCBANK', 708.25, 2.08], ['DRREDDY', 1165.5, 1.97], ['LICHSGFIN', 562.9, 1.92], ['MANKIND', 2280, 1.86], ['SAGILITY', 45.2, 1.78], ['VBL', 416.5, 1.46], ['BANDHANBNK', 176.52, 1.45], ['BAJAJHLDNG', 11134, 1.29], ['LAURUSLABS', 1969, 1.23],
    ['MOTILALOFS', 1026.5, 1.13], ['TECHM', 1541, 1.00], ['LUPIN', 2095, .83], ['MOTHERSON', 164.45, .77], ['POWERINDIA', 31435, .77], ['NYKAA', 344.5, .75], ['HDFCLIFE', 530, .73], ['COFORGE', 1846.5, .73], ['TORNTPHARM', 4965.5, .72], ['AUROPHARMA', 1679.8, .68], ['WIPRO', 167.4, .66], ['PREMIERENE', 974.2, .65], ['INOXWIND', 76.5, .63], ['KOTAKBANK', 419, .59], ['INDIGO', 4973, .57], ['VOLTAS', 1165, .56],
    ['PGEL', 545, .55], ['GMRAIRPORT', 97.98, .53], ['KPITTECH', 553.75, .51], ['BPCL', 304.5, .50], ['IDEA', 14.97, .47], ['CROMPTON', 231, .43], ['RBLBANK', 412.55, .43], ['ETERNAL', 323.5, .43], ['AUBANK', 1058.9, .40], ['NAM-INDIA', 1189.6, .39], ['INDHOTEL', 718.5, .38], ['CDSL', 1360, .37], ['PATANJALI', 341, .37], ['BHEL', 431, .35], ['OFSS', 11763, .32], ['BANKBARODA', 238.13, .21],
    ['ITC', 259.85, .21], ['TMPV', 301.1, .20], ['ULTRACEMCO', 11000, .19], ['PFC', 353.45, .18], ['KAYNES', 3505, .17], ['GLENMARK', 2419.2, .17], ['MPHASIS', 2295, .14], ['IOC', 135.11, .13], ['ZYDUSLIFE', 1119.1, .12], ['INFY', 1037.7, .12], ['PERSISTENT', 5516, .12], ['ICICIPRULI', 471.5, .11], ['KFINTECH', 900, .11], ['TORNTPOWER', 1297.6, .10], ['TVSMOTOR', 4125, .08], ['GVT&D', 4548.1, .07],
    ['SIEMENS', 3957, .07], ['DALBHARAT', 1746.6, .07], ['NHPC', 76.38, .04], ['IRFC', 81.09, .01], ['PHOENIXLTD', 1890, 0], ['AXISBANK', 1246, 0], ['PNBHOUSING', 1178.9, -.01], ['DMART', 3688, -.05], ['HCLTECH', 1206.1, -.07], ['PNB', 116.75, -.09], ['MAXHEALTH', 1037.7, -.09], ['MARICO', 802.1, -.11], ['DABUR', 376, -.12], ['PIDILITIND', 1566.9, -.13], ['CAMS', 711, -.14], ['ATHERENERG', 1656, -.14],
    ['JIOFIN', 229.9, -.15], ['TCS', 2200.8, -.15], ['POLICYBZR', 1797.3, -.15], ['BEL', 404.35, -.16], ['HINDPETRO', 352, -.18], ['MAHABANK', 84.2, -.18], ['ADANIPORTS', 1764.6, -.19], ['MFSL', 1477, -.20], ['NESTLEIND', 1383.3, -.21], ['SUZLON', 44.12, -.23], ['TITAN', 5009.5, -.23], ['BIOCON', 390.65, -.26], ['SWIGGY', 278.2, -.29], ['RVNL', 204.9, -.34], ['ICICIGI', 1459.8, -.35], ['INDIANB', 853.5, -.35],
    ['RECLTD', 312.7, -.35], ['SYNGENE', 382.65, -.36], ['SOLARINDS', 22290, -.36], ['UNITDSPR', 1395, -.36], ['360ONE', 1091, -.36], ['LICI', 404.1, -.37], ['ICICIBANK', 1379.3, -.38], ['UPL', 572.95, -.41], ['BDL', 1190, -.42], ['BHARTIARTL', 1831.1, -.43], ['FEDERALBNK', 344.5, -.43], ['HAVELLS', 1111, -.45], ['NTPC', 333.4, -.48], ['CANBK', 124, -.48], ['AMBER', 7245, -.48], ['GAIL', 173.62, -.50],
    ['BHARATFORG', 1944.9, -.51], ['PETRONET', 287.2, -.52], ['CIPLA', 1366, -.53], ['PPLPHARMA', 211.35, -.54], ['M&M', 3107, -.54], ['MANAPPURAM', 329, -.54], ['ADANIENT', 3060, -.56], ['GODREJCP', 865, -.56], ['DIXON', 13425, -.56], ['TRENT', 2802.4, -.58], ['LT', 3930.7, -.61], ['CGPOWER', 909, -.61], ['UNIONBANK', 178.1, -.61], ['COLPAL', 1797.4, -.61], ['TATAPOWER', 364.65, -.64], ['CHOLAFIN', 1845.9, -.70]
  ],

  /* nifty bank heat map.png */
  bank: [['SBIN', 1.14], ['HDFCBANK', .77], ['PNB', .5], ['INDUSINDBK', -.08], ['KOTAKBANK', -.21], ['IDFCFIRSTB', -.31], ['CANBK', -.35], ['AXISBANK', -.53], ['BANKBARODA', -.7], ['AUBANK', -1.11], ['FEDERALBNK', -1.39]],

  /* Screenshot 2026-08-12 – Nifty 50 advance / decline bars */
  adNifty: {
    up: [['BAJAJFINSV', .55], ['ASIANPAINT', .50], ['BEL', .50], ['JSWSTEEL', .49], ['BAJAJ-AUTO', .49], ['ETERNAL', .46], ['WIPRO', .38], ['GRASIM', .37], ['TATASTEEL', .35], ['SHRIRAMFIN', .33], ['COALINDIA', .27], ['INDIGO', .27], ['KOTAKBANK', .26], ['INFY', .25], ['ICICIBANK', .25], ['ADANIPORTS', .25], ['ADANIENT', .25]],
    down: [['TRENT', -.30], ['HINDALCO', -.28], ['HINDUNILVR', -.25], ['M&M', -.25], ['LT', -.25], ['BHARTIARTL', -.23], ['NESTLEIND', -.23], ['MARUTI', -.21], ['ONGC', -.18], ['NTPC', -.18], ['DRREDDY', -.07], ['BAJFINANCE', -.06], ['AXISBANK', -.06], ['SBIN', -.03], ['HDFCLIFE', -.03]]
  },

  /* NIFTY SECTOR WEIGHT FOR ANCHOR CAPITAL.png – Nifty 500 classification, 26 sectors */
  sectorWeights: [
    ['Nifty Bank', 31.34, 'Banks & scheduled commercial banks', 'Very high'],
    ['Nifty Financial Services', 14.12, 'NBFCs, HFCs, exchanges, financial institutions', 'High'],
    ['Nifty Financial Services 25/50', 6.85, 'Large & mid cap financial services companies', 'High'],
    ['Nifty Capital Goods', 6.54, 'Capital goods, electrical equipment, machinery', 'Moderately high'],
    ['Nifty Auto', 4.63, 'Automobiles, auto ancillaries, tractors, two wheelers', 'Moderate'],
    ['Nifty IT', 4.34, 'IT software, services, consulting', 'Moderate'],
    ['Nifty FMCG', 3.73, 'FMCG, food products, beverages, tobacco', 'Moderate'],
    ['Nifty Oil & Gas', 3.68, 'Oil exploration, refining, marketing, gas', 'Moderate'],
    ['Nifty Private Bank', 2.81, 'Private sector banks', 'Moderate'],
    ['Nifty Metal', 2.67, 'Ferrous, non-ferrous metals, metal products', 'Moderate'],
    ['Nifty Pharma', 2.55, 'Pharmaceuticals, bulk drugs, biotech', 'Moderate'],
    ['Nifty Consumer Durables', 1.91, 'Home appliances, durables, electronics', 'Low to moderate'],
    ['Nifty Consumer Services', 1.73, 'Retail, hotels, restaurants, entertainment, services', 'Low to moderate'],
    ['Nifty Healthcare', 1.71, 'Healthcare services, equipment, diagnostics', 'Low to moderate'],
    ['Nifty Realty', 1.50, 'Real estate, developers, REITs', 'Low to moderate'],
    ['Nifty Construction', 1.42, 'Construction, engineering, infrastructure', 'Low to moderate'],
    ['Nifty Chemicals', 1.24, 'Chemicals, petrochemicals, fertilizers', 'Low to moderate'],
    ['Nifty Cement', 1.03, 'Cement, cement products, building materials', 'Low to moderate'],
    ['Nifty Insurance', 0.98, 'Life and general insurance companies', 'Low'],
    ['Nifty PSU Bank', 0.80, 'Public sector banks', 'Low'],
    ['Nifty NBFC', 0.73, 'Non banking financial companies', 'Low'],
    ['Nifty Housing Finance', 0.68, 'Housing finance companies', 'Low'],
    ['Nifty Commercial & Transport Services', 0.61, 'Transport, logistics, aviation, commercial services', 'Low'],
    ['Nifty Media', 0.47, 'Media, broadcasting, publishing', 'Low'],
    ['Nifty Hospitals', 0.33, 'Hospitals, healthcare providers', 'Low'],
    ['Nifty Financial Services Ex Bank', 0.26, 'Financial services (excluding banks)', 'Lowest']
  ],

  /* anchor heaslines.png – "The 19-line market matrix" */
  matrix: [
    ['NIFTY 50', 'Core benchmark index'], ['NIFTY NEXT 50', 'Large-cap growth index'], ['BIG TRADE LIST', 'Master strategy watchlist'], ['BANK NIFTY', 'High-weight sector index'], ['ETF', 'Exchange traded product grouping'],
    ['FINANCIAL SERVICES', '36.00% heavyweight macro unit'], ['Oil, Gas & Consumable Fuels', '5.82% macro weight'], ['Information Technology', '5.82% macro weight'], ['Automobile & Auto Components', '5.82% macro weight'], ['Fast Moving Consumer Goods', '5.82% macro weight'],
    ['Healthcare / Pharma', '5.82% macro weight'], ['Telecommunication', '5.82% macro weight'], ['Metals & Mining', '5.82% macro weight'], ['Construction Materials', '5.82% macro weight'], ['Realty', '5.82% isolated real estate unit'],
    ['Consumer Durables', '5.82% macro weight'], ['Power', '5.82% macro weight'], ['Services', '5.82% macro weight'], ['Capital Goods / Defense', '5.82% macro weight']
  ],

  /* Sector holdings tables (Anchor Capital sectors / METAL TO CONSUMER GOODS / IT-Auto-Energy screenshot) */
  holdings: [
    { name: 'FMCG', total: 3.96, rows: [['Hindustan Unilever', 9.01], ['ITC', 6.35], ['Nestle India', 2.44], ['Britannia Industries', 1.60], ['Tata Consumer Products', 1.29], ['Godrej Consumer Products', 1.18], ['Dabur India', 1.02], ['Marico', .83], ['Colgate Palmolive (India)', .68], ['Emami', .56], ['United Spirits', .45], ['Varun Beverages', .40], ['GC Foods', .34], ['Prataap Snacks', .29], ['Gillette India', .26]] },
    { name: 'Pharma', total: 4.56, rows: [['Sun Pharmaceutical Inds.', 9.69], ["Dr. Reddy's Laboratories", 4.34], ['Cipla', 2.72], ["Divi's Laboratories", 2.10], ['Lupin', 1.32], ['Aurobindo Pharma', 1.27], ['Zydus Lifesciences', 1.00], ['Glenmark Pharmaceuticals', .98], ['Torrent Pharmaceuticals', .67], ['Alkem Laboratories', .67], ['Biocon', .45], ['IPCA Laboratories', .42], ['Abbott India', .41], ['Pfizer', .31], ['Sanofi India', .20]] },
    { name: 'Capital Goods', total: 4.69, rows: [['Adani Enterprises', .39], ['Larsen & Toubro', .32], ['Siemens', .32], ['BHEL', .21], ['ABB India', .16], ['Thermax', .14], ['CG Power & Industrial Solutions', .13], ['KEC International', .12], ['Kirloskar Brothers', .11], ['Cummins India', .10], ['BEML', .10], ['Ingersoll Rand (India)', .08], ['Bharat Electronics', .08], ['The Ramco Cements', .07], ['MTAR Technologies', .06]] },
    { name: 'Consumer Durables', total: 2.34, rows: [['Titan Company', .44], ['Voltas', .26], ['Havells India', .22], ['Blue Star', .16], ['Whirlpool of India', .16], ['Crompton Greaves Consumer', .15], ['Amber Enterprises India', .14], ['Kaynes Technology India', .12], ['Greenpanel Industries', .11], ['Dixon Technologies (India)', .10], ['eClerx Services', .08], ['Brightcom Group', .06]] },
    { name: 'Automobile', total: 8.47, rows: [['Maruti Suzuki India', 23.50], ['Mahindra & Mahindra', 13.20], ['Bajaj Auto', 8.50], ['Eicher Motors', 7.10], ['Hero MotoCorp', 5.20], ['TVS Motor Company', 5.20], ['Ashok Leyland', 3.80], ['Samvardhana Motherson Intl.', 3.30], ['Bharat Forge', 2.10], ['Bosch', 2.30], ['Exide Industries', 1.80], ['Tube Investments of India', .80]] },
    { name: 'Energy (Oil, Gas & Power)', total: 7.65, rows: [['Reliance Industries', 35.38], ['NTPC', 6.54], ['Power Grid Corporation', 5.13], ['Coal India', 4.12], ['ONGC', 3.80], ['Adani Power', 3.62], ['Indian Oil Corporation', 2.06], ['GAIL (India)', 1.87], ['Tata Power Co.', 1.82], ['Oil & Natural Gas Corp.', 1.14], ['Adani Green Energy', 1.06], ['JSW Energy', 1.45], ['NHPC', .80], ['Solar Industries India', .21], ['Vedanta', .18], ['Petronet LNG', .08]] },
    { name: 'Metals & Mining', total: 6.41, rows: [['Tata Steel', 16.03], ['JSW Steel', 14.10], ['Hindalco Industries', 11.36], ['Vedanta', 10.56]], note: 'Top four shown. Remaining rows were not legible in the source image.' },
    { name: 'Information Technology', total: 15.61, rows: [['Infosys', 35.63], ['TCS', null], ['HCL Technologies', null], ['Tech Mahindra', null], ['Persistent Systems', null], ['Coforge', null], ['Wipro', null], ['LTIMindtree', null], ['Mphasis', null], ['Oracle Financial Services', null]], note: 'Order from the source image (ranks 1–10). Weights other than Infosys were not legible.' }
  ],

  /* sector detail.png – Banking drill-down */
  banking: {
    strength: 92, tiles: [['HDFC BANK', 1.42, 'xl'], ['ICICI BANK', .86, 'lg'], ['SBI', 1.05, 'sm'], ['AXIS BANK', .53, 'md'], ['KOTAK', -.12, 'md'], ['INDUSIND', -.44, 'md']],
    summary: [['Advance / decline', '8 / 3'], ['Avg. price change', '+0.61%'], ['Leadership', 'Private banks'], ['Momentum', 'Positive'], ['Watch item', 'Bank Nifty']]
  },

  /* Screenshot 2026-08-17 220837 – sector rotation / gainers, neutral, losers */
  rotation: {
    Gainers: ['Realty', 'Auto', 'Consumer durables', 'Consumption', 'Banknifty', 'Services'],
    Neutral: ['IT', 'Sensex'],
    Losers: ['PSU bank', 'Oil and gas', 'FMCG', 'Commodities', 'Finnifty', 'Private bank', 'Media', 'Midcap', 'Chemicals', 'Pharma', 'Healthcare', 'Defence', 'Capital markets', 'Infra', 'Metal', 'Energy'],
    Improving: ['IT', 'Sensex'],
    Leading: ['Realty', 'Auto', 'Consumer durables', 'Consumption', 'Banknifty', 'Services'],
    Lagging: ['PSU bank', 'Oil and gas', 'FMCG', 'Commodities'],
    Weakening: ['Finnifty', 'Private bank', 'Media', 'Midcap', 'Chemicals', 'Pharma', 'Healthcare', 'Defence', 'Capital markets', 'Infra', 'Metal', 'Energy']
  },

  /* SECTOR WISE AND SHARE PRICE MONITOR CHART.png – sector map samples */
  sectorMap: [
    ['Financial Services', [['SBIN', 1.12], ['HDFCBANK', -.45], ['KOTAKBANK', -.82], ['AXISBANK', -1.43], ['ICICIBANK', -2.50], ['BAJFINANCE', -5.84]]],
    ['Oil, Gas & Consumable Fuels', [['RELIANCE', .74], ['IOC', .2], ['BPCL', -.3], ['ONGC', .1]]],
    ['Information Technology', [['TCS', 3.36], ['HCLTECH', 1.62], ['INFY', .87], ['WIPRO', .76]]],
    ['Automobile', [['M&M', 2.82], ['MARUTI', .70], ['BAJAJ-AUTO', .36]]],
    ['FMCG', [['HINDUNILVR', .79], ['ITC', .07], ['NESTLEIND', -.2]]],
    ['Capital Goods', [['BEL', .45], ['HAL', -.20], ['ADANIENT', -.09]]],
    ['Telecommunication', [['BHARTIARTL', .61]]],
    ['Consumer / Construction', [['TITAN', -1.14], ['LT', -.14]]]
  ],

  /* STOCK TO WATCH.png / POITIVE.png (ET Now graphics – facts restated) */
  watchPositive: [
    ['Narayana Hrudayalaya', 'IRDAI Chairman Ajay Seth says hospitals may be allowed to facilitate health insurance sales.'],
    ['PC Jeweller', 'Repays all consortium debt and becomes debt-free ahead of schedule.'],
    ['AGI Infra', 'Board approves raising up to ₹275 crore through a QIP.'],
    ['Aditya Infotech', 'Closes QIP and allots 43.3 lakh shares at ₹3,467 per share, a 4.97% discount to the floor price.'],
    ['Edelweiss Financial Services', 'Carlyle completes acquisition of a majority stake in Nido Home Finance with an investment of over ₹2,000 crore.'],
    ['Kotak Mahindra Bank', 'Board approves merger of Kotak Mahindra Investments with Kotak Alternate.']
  ],
  watchNegative: ['Waterways Leisure Tourism', 'Rajputana Stainless', 'Saatvik Green Energy', 'AWFIS Space Solutions', 'Powerica'],

  /* MONTHLY DIVIDEND STOCKS.png */
  dividends: [
    ['January', ['TCS', 'HCL', 'Angel One']], ['February', ['IDFC First Bank', 'ITC', 'ONGC']], ['March', ['SAIL', 'CRISIL', 'SBI Card']],
    ['April', ['Britannia', 'Vedanta', 'HCL', 'Nestlé']], ['May', ['ITC', 'Vedanta', 'SBI', 'HDFC Bank']], ['June', ['Tata Power', 'Infosys', 'Bajaj Finserv']],
    ['July', ['TCS', 'PFC', 'IRFC']], ['August', ['Coal India', 'Oil India', 'ONGC']], ['September', ['HUDCO', 'BPCL', 'GNCC']],
    ['October', ['Indian Oil', 'HCL', 'Infosys', 'TCS']], ['November', ['Coal India', 'GAIL', 'ONGC', 'Oil India']], ['December', ['HCS', 'Vedanta', 'PTC India', 'NALCO']]
  ],

  /* Blue and White … Profit and Loss Presentation.pdf – sector portfolio model */
  portfolio: {
    banking: 26, total: 86,
    sectors: [
      { name: 'IT Sector', shares: 15, groups: [['Large Cap IT (5)', 'TCS, Infosys, Wipro, HCL Technologies, Tech Mahindra'], ['Mid Cap IT (5)', 'Mphasis, Coforge, Persistent, NIIT Tech, Hexaware'], ['Small Cap IT (5)', 'Mastek, Tata Elxsi, Birlasoft, Zensar, KPIT Technologies']] },
      { name: 'FMCG Sector', shares: 15, groups: [['Top Holdings (5)', 'HUL, ITC, Nestle India, Britannia, Dabur'], ['Mid-Cap FMCG (5)', 'Marico, Godrej Consumer, Emami, Colgate, P&G Hygiene'], ['Emerging FMCG (5)', 'Tata Consumer, Varun Beverages, United Spirits, Radico Khaitan, CCL Products']] },
      { name: 'Infrastructure Sector', shares: 15, groups: [['Large Cap Infrastructure (5)', 'Power, Roads & Highways, Ports'], ['Mid Cap Infrastructure (5)', 'Urban Transport, Water Supply, Telecom'], ['Small Cap Infrastructure (5)', 'Logistics, Smart Cities, Renewable Energy']] },
      { name: 'Pharma Sector', shares: 15, groups: [] }
    ]
  },

  /* UNKNOWN ANCHOR CAPITAL 1 slide.odp – Anchor Capital Pro */
  pro: {
    particulars: [
      ['Company & Sector', 'Stock name, sector, scrip / ticker and market-cap context'],
      ['Profit & Growth', 'Current-quarter profit, previous-quarter profit and growth %'],
      ['Market Activity', 'CMP, total volume, today\'s volume and average volume'],
      ['Buy / Sell Activity', 'Buy quantity, sell quantity and Buy/Sell ratio'],
      ['Technical Signals', 'RSI, ADX, Pivot Point and 15-minute candle conditions'],
      ['Decision Output', 'Status, Anchor Capital Score and revised priority']
    ],
    universe: [['NIFTY 50', 'Core large-cap companies with strong market relevance.'], ['NIFTY NEXT 50', 'Next-tier large companies for additional opportunities.'], ['Selected Mid Cap', 'Selected stocks rather than an indiscriminate broad universe.'], ['High-weightage', 'Focus on important stocks across major sectors.']],
    decisions: [['Strong Buy', 'Highest-priority candidates after the screening model.', 'buy'], ['Strong Sell', 'Stocks showing significant weakness under the selected rules.', 'sell'], ['Review', 'Interesting stocks that need additional confirmation.', 'review'], ['Not Now', 'Does not currently meet the priority criteria.', 'not']],
    volume: [['Today\'s volume', 'Current trading volume for the selected stock.'], ['1-week avg volume', 'A comparison baseline for recent activity.'], ['Variance', 'Shows whether current activity is above or below the reference level.'], ['Buy / sell ratio', 'Compares buy quantity with sell quantity for market-activity context.'], ['Volume ratio', 'Identifies unusually high or low participation.']],
    technical: [['RSI', 'Momentum / overbought–oversold context'], ['ADX', 'Trend strength'], ['Pivot Point', 'Reference level for market bias'], ['15-Min Candle', 'Open vs previous candle'], ['Volume Ratio', 'Today\'s activity vs average'], ['Price Change', 'Current movement and direction']]
  },

  fundamental: ['Sales growth', 'Sales CAGR 3 years', 'Profit growth', 'Annual profit', 'Earning consistency', 'Promoters holding', 'FII holdings', 'DII holdings', 'Promoters pledge', 'Change in FII / DII holdings'],
  financial: ['Annual profit', 'Annual profit > last year', 'Quarterly profit', 'Quarterly profit > previous', 'P/E ratio', 'Debt to equity', 'ROE & ROCE', 'EPS', 'PAT', 'OPM', 'Current ratio', 'Dividend yield'],
  technical: ['Volume analysis', 'Volume breakout', 'Delivery percentage', 'Price × volume confirmation', 'Relative strength (beating the Nifty 50 index)', 'Underperforming the broader market', 'Pivot point', 'Price breaks resistance with huge volume', 'Delivery consistency above 50% on positive days', 'Higher high / higher low', 'Lower high / lower low', 'Bullish / bearish'],
  indicators: ['ADX', 'Bollinger Band', 'SMA', 'Double Moving Average', 'MACD with Histogram', 'On Balance Volume', 'Pivot Point', 'Rate of Change %', 'RSI', 'Stochastic', 'Williams %R', 'MVWAP'],

  policy: [
    'Anchor Capital Pro aims to provide fundamental analysis, financial analysis and technical analysis in a simple way.',
    'Even a beginner can easily understand the basics of the stock market.',
    'To avoid over-crowding of stocks, we provide 500 stocks only.',
    'Based on their performance, we divide them into Platinum, Gold and Silver.',
    'We provide information about shares with strong, weak and wait on the basis of their performance in the market.'
  ],

  /* SCREENER 1.png – Market Watch List columns, populated with SAMPLE rows */
  screener: [
    // name, sector, cmp, mcap(₹ Cr), curNP, prevNP, buyQty(L), sellQty(L), chg%, todayVol(L), avgVol(L), pivot, openVsPivot('>'|'<'), candle15('>'|'<'), score, status
    ['HDFCBANK', 'Banking', 708.25, 1090000, 17200, 16800, 42.1, 31.4, 2.08, 198, 142, 695, '>', '>', 88, 'Strong Buy'],
    ['INFY', 'IT', 1037.7, 430000, 6900, 6600, 18.2, 16.0, .12, 88, 81, 1030, '>', '>', 74, 'Review'],
    ['TCS', 'IT', 2200.8, 796000, 12400, 12100, 9.4, 10.1, -.15, 41, 44, 2215, '<', '<', 52, 'Not Now'],
    ['KOTAKBANK', 'Banking', 419, 833000, 5200, 4900, 25.3, 20.9, .59, 121, 104, 415, '>', '>', 79, 'Strong Buy'],
    ['ITC', 'FMCG', 259.85, 325000, 5100, 4950, 34.0, 28.2, .21, 164, 150, 258, '>', '<', 66, 'Review'],
    ['LT', 'Capital Goods', 3930.7, 540000, 3900, 4100, 7.1, 9.6, -.61, 52, 47, 3960, '<', '<', 31, 'Strong Sell'],
    ['BHARTIARTL', 'Telecom', 1831.1, 1100000, 4200, 3900, 11.8, 14.9, -.43, 60, 58, 1845, '<', '<', 44, 'Not Now'],
    ['WIPRO', 'IT', 167.4, 175000, 3300, 3100, 27.5, 19.7, .66, 140, 98, 165, '>', '>', 81, 'Strong Buy'],
    ['M&M', 'Automobile', 3107, 386000, 3100, 3400, 8.8, 12.4, -.54, 38, 40, 3130, '<', '>', 48, 'Review'],
    ['ICICIBANK', 'Banking', 1379.3, 985000, 11500, 11200, 29.9, 33.5, -.38, 175, 160, 1388, '<', '<', 57, 'Review'],
    ['TITAN', 'Consumer Durables', 5009.5, 445000, 950, 1020, 4.2, 6.8, -.23, 19, 21, 5030, '<', '<', 29, 'Strong Sell'],
    ['INDIGO', 'Services', 4973, 192000, 1800, 1500, 6.5, 5.1, .57, 27, 22, 4950, '>', '>', 85, 'Strong Buy']
  ]
};
