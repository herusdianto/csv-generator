<template>
  <div class="container is-fluid">
    <div class="columns is-multiline">
      <div class="column">
        <b-field label="Row Count">
          <b-input v-model="config.rowCount"></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field label="Column Count">
          <b-input v-model="config.columnCount"></b-input>
        </b-field>
      </div>

      <div class="column">
        <b-field label="CSV Delimiter">
          <b-input v-model="config.delimiter"></b-input>
        </b-field>
      </div>

      <div class="column">
        <div class="field">
          <label for="with-header" class="label">With Header</label>

          <b-checkbox size="is-medium" v-model="config.withHeader" @input="populateHeaders">
            Yes
          </b-checkbox>
        </div>
      </div>
    </div>

    <div class="columns is-multiline" v-show="config.withHeader">
      <div class="column is-2" v-for="(header, index) in config.headers" :key="index">
        <b-field :label="`Header Column ${index + 1}`">
          <b-input v-model="config.headers[index]"></b-input>
        </b-field>
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
          columnCount: 6,
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