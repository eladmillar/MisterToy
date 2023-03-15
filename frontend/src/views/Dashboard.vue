<template>
  <section v-if="toys" class="dashboard">
    <DoughnutChart
      :chartData="getDataAvgPrice"
      :options="getOptions('Average price of toys per label')"
    />
    <BarChart
      :chartData="getDataLabelsPercentage"
      :options="getOptions('Percentage Of toys That Are In Stock By Label')"
    />
  </section>
</template>
  
<script>
import { DoughnutChart } from "vue-chart-3";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "toy-chart",
  components: { DoughnutChart, BarChart },
  methods: {
    getOptions(title) {
      return {
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: title
          }
        }
      };
    },
    getToysByLabel(label) {
      return this.toys.filter(toy => toy.labels.includes(label));
    }
  },
  computed: {
    toys() {
      console.log(
        "this.$store.getters.toysToDisplay",
        this.$store.getters.toysToDisplay
      );
      return this.$store.getters.toysToDisplay;
    },
    labels() {
      return this.$store.getters.labels;
    },
    getDataAvgPrice() {
      const data = this.labels.map(label => {
        // Getting an array of toys with that label
        const filteredToys = this.getToysByLabel(label);

        // returning the average price for that label
        return filteredToys.reduce(
          (avgPrice, toy) => avgPrice + toy.price / filteredToys.length,
          0
        );
      });
      return {
        labels: this.labels,
        datasets: [
          {
            borderRadius: 6,
            data,
            backgroundColor: [
              "#887878",
              "#4674b8",
              "#903c82",
              "#ffaab8",
              "#48ca6b",
              "#d0dd7d",
              "#b45026"
            ]
          }
        ]
      };
    },
    getDataLabelsPercentage() {
      // This is for making an array of object, each object represents a count (of total toys,in stock and out of stock) per label.
      const data = this.labels.map(label => {
        const filteredToys = this.getToysByLabel(label);
        const num = filteredToys.length;
        const inStock = filteredToys.filter(toy => toy.inStock).length;
        const outStock = num - inStock;
        return { num, inStock, outStock };
      });
      // console.log("data", data); // [{num:10,inStock:7,outStock:3}]

      // Now we need to make two data arrays - one for in stock toys and one for out of stock toys- with numbers representing the percentage of the toys.
      // e.g. For the doll label: if we have 10 toys overall, 3 are out of stock and 7 is in stock =>  inStockData = [70]; outStockData = [30];
      const inStockData = data.map(({ num, inStock }) => (inStock * 100) / num);
      const outStockData = data.map(
        ({ num, outStock }) => (outStock * 100) / num
      );
      // console.log("inStockData ", inStockData);
      // console.log("outStockData ", outStockData);

      return {
        labels: this.labels,
        datasets: [
          {
            label: "In stock",
            borderRadius: 6,
            data: inStockData, //This is an array numbers
            backgroundColor: ["#3ee13e"]
          },
          {
            label: "Out of stock",
            borderRadius: 6,
            data: outStockData, //This is an array of numbers
            backgroundColor: ["#ff0000"]
          }
        ]
      };
    }
  }
};
</script>


