<template>
  <div :style="'width: 100%; height: ' + chartHeight + ';'">
    <h2 v-show="showTitle">Ratings graph</h2>

    <div id="chart" style="width: 100%; height: 100%;">
      <apexchart type=line :height=chartHeight :width=chartWidth :options="chartOptions" :series="series" />
    </div>
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

  props: {
    chartHeight: String,
    chartWidth: String,
    showTitle: Boolean,
  },

  data: function () {
    return {
      series: this.$store.state.ratingStats,

      chartOptions: {
        chart: {
          id: 'ratingsGraph',
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
            enabled: false,
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

  mounted () {
    this.$store.watch(this.$store.getters.ratingStatsFunc, newValue => {
      ApexCharts.exec('ratingsGraph', 'updateSeries', newValue)
    })
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
</style>
