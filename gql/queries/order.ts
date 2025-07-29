import { graphql } from "../../gql";

export const getAllOrdersByUserQuery = graphql(`
  #graphql
  query GetAllOrdersByUser {
    getAllOrdersByUser {
      id
      fulfillments {
        pending {
          state {
            descriptor {
              code
            }
          }
        }
        packed {
          state {
            descriptor {
              code
            }
          }
        }
        agent_assigned {
          state {
            descriptor {
              code
            }
          }
        }
        out_for_pickup {
          state {
            descriptor {
              code
            }
          }
        }
        pickup_failed {
          state {
            descriptor {
              code
            }
          }
        }
        order_picked_up {
          state {
            descriptor {
              code
            }
          }
        }
        in_transit {
          state {
            descriptor {
              code
            }
          }
        }
        at_destination_hub {
          state {
            descriptor {
              code
            }
          }
        }
        out_for_delivery {
          state {
            descriptor {
              code
            }
          }
        }
        delivery_failed {
          state {
            descriptor {
              code
            }
          }
        }
        order_delivered {
          state {
            descriptor {
              code
            }
          }
        }
        cancelled {
          state {
            descriptor {
              code
            }
          }
        }
      }
      items {
        details {
          descriptor {
            name
            symbol
          }
          catalog_id
        }
      }
      order_status
      quote {
        breakup {
          details {
            price {
              value
            }
          }
          price {
            value
          }
          quantity {
            count
          }
          type
          title
          id
        }
        price {
          value
        }
      }
      store {
        descriptor {
          symbol
          name
        }
        address {
          street
        }
      }
      placed_at
      completed_at
      cancelled_at
      cancellation {
        reason {
          reason
        }
        cancelled_by
      }
    }
  }
`);

export const getAllReasonCodesQuery = graphql(`
  query GetAllReasonCodes {
    #graphql
    getAllReasonCodes {
      reason
      is_trigger_rto
      is_applicable_for_part_cancel
      id
      cost_attributed_to
      code_for
      comment
      code
    }
  }
`);
