<template>
  <div class="hello">
    <button @click="getInput()">Click Here</button>
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
    };
  },
  methods: {
    propInput() {
      console.log(this.msg);
    },
    //Formating Date object to fit API request
    testDate() {
      this.startDate =
        this.date.start.getFullYear() +
        "-" +
        (this.date.start.getMonth() + 1) +
        "-" +
        this.date.start.getDate();

      this.endDate =
        this.date.end.getFullYear() +
        "-" +
        (this.date.end.getMonth() + 1) +
        "-" +
        this.date.end.getDate();
    },
    getInput() {
      this.testDate();

      fetch(
        "https://api.opencovid.ca/timeseries?&loc=" +
          this.loc +
          "&after=" +
          this.startDate +
          "&before" +
          this.endDate
        // +
        // "&stat=avaccine"
      )
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          console.log(data);
          // this.totalVuePackages = data;
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
