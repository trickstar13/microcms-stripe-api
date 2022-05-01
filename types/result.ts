export type Base = {
  id: string,
  object: string,
  active: boolean,
  created: number,
  livemode: boolean,
  updated: number,
  type: string,
}

export type Item = Base & {
  description: string,
  images: string[],
  metadata: any,
  name: string,
  package_dimensions: string,
  shippable: boolean,
  statement_descriptor: string,
  tax_code: string,
  unit_label: string,
  url: string
  prices: {
    data: Price[]
  }
};

export type Price = Base & {
  billing_scheme: string,
  currency: string,
  product: string,
  recurring: {
    aggregate_usage: string,
    interval: string,
    interval_count: number,
    usage_type: string
  },
  tax_behavior: string,
  tiers_mode: string,
  transform_quantity: {
    divide_by: number,
    round: string,
  },
  unit_amount: number,
  unit_amount_decimal: string,
};

export type Result = {
  data: Item[]
} | null;
