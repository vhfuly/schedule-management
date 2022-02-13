<h1 align="center"> Schedule Management </h1>

<p align="center">
 <a href="#functionality">Functionality</a> •
 <a href="#running">Running</a> •
 <a href="#examples">Examples</a> •
 <a href="#autor">Autor</a>
</p>

## Functionality

This api registers scheduling rules, to facilitate the management of clinic schedules.

Functionalities:

 - To register a rule;
 - Delete a rule;
 - List all rules;
 - List available times within a range.


## Running

To execute it is very simple

```
  $ yarn # install the dependencies
  $ yarn dev:server # run application
```

## Examples

 1 - To register a rule:

  The api has three types of registers:
   - Weekly

    URL : http://localhost:3333/v1/api/schedules

    Method:  POST

    Body:
      {
        "id": "1",
        "type": "Weekly",
        "daysOfTheWeek": ["Sunday"],
        "intervals": [
          {
            "start": "14:30",
            "end": "15:00"
          },
          {
            "start": "15:00",
            "end": "15:30"
          }
        ]
      }

   - SpecificDay

    URL : http://localhost:3333/v1/api/schedules

    Method:  POST

    Body:
      {
        "id": "1",
        "type": "SpecificDay",
        "day": "13-02-2022",
        "intervals": [
          {
            "start": "14:30",
            "end": "15:00"
          },
          {
            "start": "15:00",
            "end": "15:30"
          }
        ]
      }

   - Daily

    URL : http://localhost:3333/v1/api/schedules

    Method:  POST

    Body:
      {
        "id": "1",
        "type": "Daily",
        "intervals": [
          {
            "start": "14:30",
            "end": "15:00"
          },
          {
            "start": "15:00",
            "end": "15:30"
          }
        ]
      }

  2 -  Delete a rule:

  Inform id in param, in uuid v4 format

    URL : http://localhost:3333/v1/api/schedules/:id

    Method:  DELETE

    Body:
      {
        "id": "1",
        "type": "Daily",
        "intervals": [
          {
            "start": "14:30",
            "end": "15:00"
          },
          {
            "start": "15:00",
            "end": "15:30"
          }
        ]
      }

  3 - List all rules

    URL : http://localhost:3333/v1/api/schedules

    Method:  GET

    Response:
    [
      {
        "id": "627fc8e4-6c6b-4643-a36a-3b6d64439536",
        "type": "SpecificDay",
        "day": "11-02-2022",
        "intervals": [
          {
            "start": "09:30",
            "end": "10:30"
          }
        ]
      }
    ]

  4 - List available times within a range

    URL : http://localhost:3333/v1/api/schedules/available

    Method:  GET

    Body :
    {
      "startDay": "10-02-2022",
      "endDay": "10-02-2022"
    }

    Response:
    [
      {
        "day": "10-02-2022",
        "intervals": [
          {
            "start": "18:30",
            "end": "19:00"
          }
        ]
      }
    ]


## Autor

<a href="https://victor-fuly.netlify.app/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62678105?s=460&u=c48758f0a65849d22ad11d196ab5f6e00fcedd0d&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Victor Fuly</b></sub>


With ❤️ por Victor Fuly 👋🏽

[![Linkedin Badge](https://img.shields.io/badge/-Victor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victor-hugo-fuly/)](https://www.linkedin.com/in/victor-hugo-fuly/)
[![Outlook Badge](https://img.shields.io/badge/-victor_hugo_fuly@hotmail.com-0078D4?style=flat-square&logo=microsoft-outlook&link=mailto:victor_hugo_fuly@hotmail.com)](mailto:victor_hugo_fuly@hotmail.com)
