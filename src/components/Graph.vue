<template>
  <div style="width: 100%;">
    <h2>Ratings graph</h2>

    <div id="chart">
      <apexchart type=line height=500 :width="'100%'" :options="chartOptions" :series="series" />
    </div>

    <!-- <p v-else style="margin-top: 14px; text-align: center;">
      Need at least 2 days worth of data to display graph.
    </p> -->
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
Apex.colors = ['#8affad', '#ff7c43', '#fe05b4', '#766fff', '#394e2f', '#0fb1ff', '#77f9ec', '#ca1804', '#2f4b7c', '#7745d3', '#ecf200', '#358a26', '#83070b']

export default {
  $mount: '#chart',
  
  components: {
    apexchart: VueApexCharts,
  },  

  data: function () {
    return {
      series: this.$store.getters.ratingStats,
      chartOptions: {
        chart: {
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: true,
              reset: true
            }
          },
          zoom: {
            enabled: true,
            type: 'x',
            reset: true
          },
          animations: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'stepline',
          width: 3,
        },
        grid: {
          xaxis: {
            showLines: true
          },
          yaxis: {
            showLines: true
          },
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          type: 'datetime',
        },
        subtitle: {
          margin: 0
        }
      }
    }
  },

  created () {
    console.log(this.series)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
</style>
