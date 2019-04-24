<template>
  <div class="container is-fluid">
    <section class="hero is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            CSV Generator
          </h1>
          <h2 class="subtitle">
            CSV Generator Tool For Testing
          </h2>
        </div>
      </div>
    </section>

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

          <b-switch size="is-medium" v-model="config.withHeader" @input="populateHeaders">
            {{ config.withHeader ? 'Yes' : 'No' }}
          </b-switch>
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

        <b-input v-model="config.customs[index]" v-show="config.columns[index].group === 'custom' && config.columns[index].value === 'spesific'"></b-input>

        <b-input v-model="config.customs[index]" v-show="config.columns[index].group === 'custom' && config.columns[index].value === 'random'" placeholder="Separate values with comma"></b-input>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column">
        <div class="buttons is-centered">
          <b-button type="is-primary" rounded @click.native="download">DOWNLOAD</b-button>
          <b-button type="is-danger" rounded @click.native="reset">RESET</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Faker from 'faker'

  export default {
    mounted() {
      let config = this.getLocalStorage()

      if (config) {
        this.config = config
      }
    },
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
          customs: [],
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
          {
            group: 'custom',
            items: [
              { group: 'custom', value: 'spesific', label: 'Spesific' },
              { group: 'custom', value: 'random', label: 'Random' },
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
      saveLocalStorage() {
        let config = JSON.stringify(this.config)

        window.localStorage.setItem('CSV_GENERATOR_CONFIG', config)
      },
      getLocalStorage() {
        let config = window.localStorage.getItem('CSV_GENERATOR_CONFIG')

        if (!config) {
          return null
        }

        return JSON.parse(config)
      },
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
              columns[index] = { group: 'name', value: 'findName', label: 'Find Name' }
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
      leftPadNumber(value, size) {
        let string = value.toString()

        while (string.length < (size || 2)) {
          string = "0" + string
        }

        return string
      },
      formatDate(value) {
        let year = value.getFullYear()
        let month = this.leftPadNumber(value.getMonth() + 1, 2)
        let date = this.leftPadNumber(value.getDate(), 2)

        let result = `${year}-${month}-${date}`

        return result
      },
      getFileName() {
        let now = new Date()
        let year = now.getFullYear()
        let month = this.leftPadNumber(now.getMonth() + 1, 2)
        let date = this.leftPadNumber(now.getDate(), 2)
        let hours = this.leftPadNumber(now.getHours(), 2)
        let minutes = this.leftPadNumber(now.getMinutes(), 2)
        let seconds = this.leftPadNumber(now.getSeconds(), 2)

        let prefix = 'CSV_GENERATOR'
        let timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`
        let extension = '.csv'

        let fileName = `${prefix}_${timestamp}${extension}`

        return fileName
      },
      generateContent() {
        this.saveLocalStorage()

        let { rowCount, columnCount, delimiter, withHeader, headers, columns, customs } = this.config

        let contents = []

        if (withHeader) {
          let headerContent = headers.join(delimiter)

          contents.push(headerContent)
        }

        for (let index = 0; index < rowCount; index++) {
          let columnContents = []

          columns.forEach((column, index) => {
            let { group, value } = column

            let columnValue = ''

            if (group !== 'custom') {
               columnValue = Faker[group][value]()

              // change column value to yyyy-mm-dd format
              if (group === 'date') {
                columnValue = this.formatDate(columnValue)
              }

              // change email to lowercase
              if (value === 'email') {
                columnValue = columnValue.toLowerCase()
              }
            }
            else {
              let custom = customs[index]

              if (value === 'spesific') {
                columnValue = custom
              }

              if (value === 'random') {
                let customs = custom.split(',')

                columnValue = customs[Math.floor(Math.random() * customs.length)];
              }
            }

            columnContents.push(columnValue)
          })

          let columnContent = columnContents.join(delimiter)

          contents.push(columnContent)
        }

        let content = contents.join('\n')

        return content
      },
      download() {
        let content = this.generateContent()

        let fileName = this.getFileName()
        let mimeType = 'text/csv;encoding:utf-8'
        let a = document.createElement('a')

        if (navigator.msSaveBlob) { // IE10
          navigator.msSaveBlob(
            new Blob([content],
            {
              type: mimeType
            }),
            fileName
          );
        }
        else if (URL && 'download' in a) { //html5 A[download]
          a.href = URL.createObjectURL(
            new Blob([content],
            {
              type: mimeType
            })
          );

          a.setAttribute('download', fileName);

          document.body.appendChild(a);

          a.click();

          document.body.removeChild(a);
        }
        else {
          location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
      },
      reset() {
        this.config = {
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
          customs: []
        }

        this.saveLocalStorage()
      },
    },
  }
</script>