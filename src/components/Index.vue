<template>
  <div class="container is-fluid">
    <div class="columns is-multiline is-mobile">
      <div class="column">
        <div class="field">
          <label for="row-count" class="label">Row Count</label>

          <input id="row-count" class="input" type="text" placeholder="CSV row count" v-model="config.rowCount">
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="column-count" class="label">Column Count</label>

          <input id="column-count" class="input" type="text" placeholder="CSV column count" v-model="config.columnCount">
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="delimiter" class="label">CSV Delimiter</label>

          <input id="delimiter" class="input" type="text" placeholder="CSV delimiter" v-model="config.delimiter">
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="with-header" class="label">With Header</label>
          
          <label class="checkbox">
            <input id="with-header" type="checkbox" v-model="config.withHeader" @change="populateHeaders">
              Yes
            </label>
        </div>
      </div>
    </div>

    <div class="columns is-multiline is-mobile" v-show="config.withHeader">
      <div class="column is-3" v-for="(header, index) in config.headers" :key="index">
        <div class="field">
          <label :for="`header-${index}`" class="label">{{ `Header column ${index + 1}` }}</label>

          <input id="`header-${index}`" class="input" type="text" :placeholder="`Type header column ${index + 1}`" v-model="config.headers[index]">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config: {
          rowCount: 10,
          columnCount: 5,
          delimiter: ';',
          withHeader: false,
          headers: [],
        },
      }
    },
    computed: {
      columnCount() {
        return this.config.columnCount
      }
    },
    watch: {
      columnCount(newValue, oldValue) {
        this.populateHeaders()
      }
    },
    methods: {
      populateHeaders() {
        let {columnCount, withHeader, headers} = this.config

        columnCount = parseInt(columnCount)

        if (withHeader) {
          if (headers.length <= columnCount) {
            for (let index = 0; index < columnCount; index++) {
              if (!headers[index]) {
                headers[index] = ''
              }
            }
          }
          else {
            headers.splice(columnCount)
          }
        }
      },
    },
  }
</script>