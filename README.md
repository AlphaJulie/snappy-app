# snappy

A process that keeps a list of companies restricted and unrestricted status up to date. Fetch the list of companies and load the companies into a relational database.

User Stories
As a user I want to search by business number so that I can know if the company is restricted.

Acceptance criteria:

business numbers should only compose of numbers
seaching business numbers should only return results for an exact match

As a user I want to list all restricted companies so I know all the restricted companies in the system.

Acceptance criteria:

Results should be paginated at 100 items
List of companies
https://storage.googleapis.com/snappy-recruitment-test/faux_id_fake_companies.csv

### Running Locally

Run `npm run devStart` from the **snappy-app** directory.
