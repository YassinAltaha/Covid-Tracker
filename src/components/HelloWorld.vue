<template>
  <div class="hello">
    <button @click="getInput()">Get Data</button>
    <div v-if="data">
      <h3>
        Showing Covid-19 Data From the dates of {{ startDate }} to the
        {{ endDate }} for {{ loc | capitalize }}
      </h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">New Cases</th>
            <th scope="col">Recoveries</th>
            <th scope="col">Cases Change</th>
            <th scope="col">Active Cases</th>
            <th scope="col">Deaths</th>
            <th scope="col">Total Deaths</th>
            <th scope="col">Vaccines</th>
            <th scope="col">Total Vaccines</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.length">
            <td data-label="Date">{{ row.date }}</td>
            <td data-label="New Cases">{{ row.cases }}</td>
            <td data-label="Recoveries">{{ row.recovered }}</td>
            <td data-label="Cases Change">{{ row.active_cases_change }}</td>
            <td data-label="Active Cases">{{ row.active_cases }}</td>
            <td data-label="Deaths">{{ row.deaths }}</td>
            <td data-label="Total Deaths">{{ row.cumulative_deaths }}</td>
            <td data-label="# Vaccinates">{{ row.avaccine }}</td>
            <td data-label="Total Vaccines">{{ row.cumulative_cvaccine }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Data is NOT LOADED</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    loc: String,
    date: Object,
  },
  data() {
    return {
      startDate: String,
      endDate: String,
      data: null,
    };
  },
  filters: {
    capitalize: function(v) {
      if (!v) return "";
      v = v.toString();
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  watch: {
    loc() {
      this.getInput();
    },
    date() {
      this.getInput();
    },
  },
  methods: {
    propInput() {
      console.log(this.msg);
    },
    //Formating Date object to fit API request
    formateDate(dateObj) {
      this.startDate =
        dateObj.start.getFullYear() +
        "-" +
        (dateObj.start.getMonth() + 1) +
        "-" +
        dateObj.start.getDate();

      this.endDate =
        dateObj.end.getFullYear() +
        "-" +
        (dateObj.end.getMonth() + 1) +
        "-" +
        dateObj.end.getDate();
    },
    //Formating Request String for opencovid API
    formatedRequest(location, startDates, endDates) {
      const str =
        "https://api.opencovid.ca/summary?loc=" +
        location +
        "&after=" +
        startDates +
        "&before=" +
        endDates;
      return str;
    },

    getInput() {
      //Formating the date pbjects to suit the API request
      this.formateDate(this.date);

      //Aysc Fetching Request Using FormatedRequest()
      fetch(this.formatedRequest(this.loc, this.startDate, this.endDate))
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          this.data = data.summary;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
