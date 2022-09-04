import { NearBindgen, NearContract, near, call, view } from 'near-sdk-js'

interface Data {
  [k: string]: string | number | Data
}

@NearBindgen
class Ash extends NearContract {
  private data: Data

  constructor({ initData = {} }: { initData: Data }) {
    super()
    this.data = initData
  }

  default() {
    return new Ash({ initData: {} })
  }

  @view
  get_data(): Data {
    near.log(`The current data is:`, this.data)
    return this.data
  }

  @call
  set_data({ data }: { data: Data }): void {
    near.log(`Set new data:`, data)
    this.data = data
  }

  @call
  set_data_by_key({ key, value }: { key: string; value: string | number | Data }) {
    near.log(`Set a value for key(${key}):`, value)
    this.data[key] = value
  }
}
