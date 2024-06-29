
![image](https://github.com/hunters-org/hunter-kit/assets/88955610/99b0dd80-4bfe-4846-9da2-e5d94d2892d7)

# hunter-kit
**Hunter-kit** is a comprehensive security toolkit designed for cross-platform usage with a magnificent UI. It streamlines the process of pentesting engagements by providing an extensive set of features to assist security professionals in scanning Web App targets, identifying vulnerabilities, and reporting them efficiently.

## Features

### 1. Reconnaissance
- **Subdomain Enumeration**: Discover subdomains associated with the target domain.
- **Wayback URLs**: Retrieve URLs from the Wayback Machine to understand the history of the target.
- **Parameter Discovery**: Identify and list parameters used by the target application.
- **JavaScript Files**: Analyze JS files for further investigation.

### 2. Secret & Token Search
- **JS File Analysis**: Scan JavaScript files to identify any secrets, tokens, API keys, or hard-coded information.

### 3. Initial Attack Vectors
- **Injection Attacks**: Perform injection attacks like SQLi, XSS, and SSTI to test for vulnerabilities.
- **Subdomain Takeover**: Detect and report subdomain takeover vulnerabilities.
- **Admin Panel Discovery**: Locate admin panels and test for default credentials.

### 4. Vulnerability Scanning
- **Tech Stack Detection**: Identify technologies used by the web application efficiently.
- **Subdomain Takeover**: Check for potential subdomain takeover vulnerabilities.
- **Admin Panel and Default Credentials**: Locate admin panels and test for default credentials.
- **Additional Scans**: Various other vulnerability scanning capabilities.

### 5. Results and Reporting
- **Organized Results**: The toolkit organizes all results in a modern and reliable way, which is immensely helpful during the reporting phase.
- **Statistics**: Generate detailed statistics to provide a comprehensive overview of the findings.

# run the project


```bash
yarn install
```

make sure your deps in dir called `bin`

run the DepScript to download the scripts

```bash
python3 depScript.py
```


Run the Project locally

```bash
yarn start
```
## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions, improvements, or bug reports.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to all the contributors and the open-source community for their valuable inputs and support.

---
