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
        <b-field :label="`Header ${index + 1}`">
          <b-input v-model="config.headers[index]"></b-input>
        </b-field>
      </div>
    </div>

    <div class="columns is-multiline" v-show="columnCount">
      <div class="column is-2" v-for="(column, index) in config.columns" :key="index">
        <b-field :label="`Column ${index + 1}`">
          <b-select v-model="config.columns[index]" expanded>
            <optgroup v-for="(option, indexOpt) in options" :key="indexOpt" :label="capitalize(option.group)">
                <option v-for="(item, indexItem) in option.items" :key="indexItem" :value="item">
                  {{ item.label }}
                </option>
            </optgroup>
          </b-select>
        </b-field>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column">
        <div class="buttons is-centered">
          <b-button type="is-primary" rounded>DOWNLOAD</b-button>
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
          columnCount: 6,
          delimiter: ';',
          withHeader: false,
          headers: [],
          columns: [
            { group: 'name', value: 'findName', label: 'Find Name' },
            { group: 'name', value: 'findName', label: 'Find Name' },
            { group: 'name', value: 'findName', label: 'Find Name' },
            { group: 'name', value: 'findName', label: 'Find Name' },
            { group: 'name', value: 'findName', label: 'Find Name' },
            { group: 'name', value: 'findName', label: 'Find Name' },
          ],
        },
        options: [
          {
            group: 'address',
            items: [
              { group: 'address', value: 'zipCode', label: 'Zip Code' },
              { group: 'address', value: 'city', label: 'City' },
              { group: 'address', value: 'streetAddress', label: 'Street Address' },
              { group: 'address', value: 'country', label: 'Country' },
              { group: 'address', value: 'state', label: 'State' },
              { group: 'address', value: 'latitude', label: 'Latitude' },
              { group: 'address', value: 'longitude', label: 'Longitude' },
            ],
          },
          {
            group: 'company',
            items: [
              { group: 'company', value: 'companyName', label: 'Company Name' },
            ],
          },
          {
            group: 'date',
            items: [
              { group: 'date', value: 'past', label: 'Past' },
              { group: 'date', value: 'future', label: 'Future' },
              { group: 'date', value: 'between', label: 'Between' },
              { group: 'date', value: 'recent', label: 'Recent' },
            ],
          },
          {
            group: 'internet',
            items: [
              { group: 'internet', value: 'email', label: 'Email' },
              { group: 'internet', value: 'userName', label: 'Username' },
              { group: 'internet', value: 'password', label: 'Password' },
              { group: 'internet', value: 'url', label: 'URL' },
            ],
          },
          {
            group: 'lorem',
            items: [
              { group: 'lorem', value: 'words', label: 'Words' },
              { group: 'lorem', value: 'sentence', label: 'Sentence' },
              { group: 'lorem', value: 'sentences', label: 'Sentences' },
              { group: 'lorem', value: 'paragraph', label: 'Paragraph' },
              { group: 'lorem', value: 'paragraphs', label: 'Paragraphs' },
            ],
          },
          {
            group: 'name',
            items: [
              { group: 'name', value: 'firstName', label: 'First Name' },
              { group: 'name', value: 'lastName', label: 'Last Name' },
              { group: 'name', value: 'findName', label: 'Find Name' },
            ],
          },
          {
            group: 'phone',
            items: [
              { group: 'phone', value: 'phoneNumber', label: 'Phone Number' },
              { group: 'phone', value: 'phoneNumberFormat', label: 'Phone Number Format' },
            ],
          },
          {
            group: 'random',
            items: [
              { group: 'random', value: 'number', label: 'Number' },
              { group: 'random', value: 'uuid', label: 'UUID' },
            ],
          },
        ],
      }
    },
    computed: {
      columnCount() {
        return parseInt(this.config.columnCount)
      },
    },
    watch: {
      columnCount(newValue, oldValue) {
        this.populateHeaders()

        this.populateColumns()
      }
    },
    methods: {
      populateHeaders() {
        let {withHeader, headers} = this.config
        let columnCount = this.columnCount

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
      populateColumns() {
        let {columns} = this.config
        let columnCount = this.columnCount

        if (columns.length <= columnCount) {
          for (let index = 0; index < columnCount; index++) {
            if (!columns[index]) {
              columns[index] = {}
            }
          }
        }
        else {
          columns.splice(columnCount)
        }
      },
      capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
    },
  }
</script>