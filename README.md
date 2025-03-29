# LinkedIn Scraper

A web scraper to extract job listings and profile data from LinkedIn using Puppeteer and Apify.

## Features
- Automatically logs in to LinkedIn
- Searches for jobs based on category and location
- Extracts job details (title, location, time, URL, etc.)
- Supports pagination for multiple pages
- Stores data in Apify Dataset

## Prerequisites
- Node.js installed
- Puppeteer and Apify SDK installed (`npm install`)
- LinkedIn account credentials stored in `storage/key_value_stores/INPUT.json`

## Installation
```sh
# Clone the repository
git clone https://github.com/yourusername/linkedin-scraper.git
cd linkedin-scraper

# Install dependencies
npm install
```

## Usage
```sh
# Run the scraper
node scraper.js
```

## Project Structure
```
├── extract
│   ├── detail.js        # Extracts job details
│   ├── index.js         # Exports extractDetail and paginationData functions
│   ├── pagination.js    # Handles pagination
├── storage
│   ├── key_value_stores
│   │   ├── INPUT.json   # Stores input parameters (email, password, category, city)
├── scraper.js           # Main scraper logic
├── package.json         # Project dependencies
├── README.md            # Project documentation
└── node_modules/        # Dependencies
```

## Input Configuration
Store credentials and input parameters in `storage/key_value_stores/INPUT.json`:
```json
{
  "email": "your-email@example.com",
  "password": "your-password",
  "category": "Software Engineer",
  "city": "New York"
}
```

## Technologies Used
- Node.js
- Puppeteer
- Apify SDK
- MongoDB Atlas (optional for data storage)

## Notes
- This scraper is for educational purposes only. Scraping LinkedIn without permission may violate their terms of service.
- Consider using LinkedIn's official API if available.

## License
This project is licensed under the MIT License.

## Author
[Ayush Kava](https://github.com/Ayush-Kava)
