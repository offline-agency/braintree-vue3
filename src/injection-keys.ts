import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { Client } from 'braintree-web'

/**
 * The shape of the context provided by a component that calls useBraintreeClient().
 * Descendants inject this via inject(BraintreeClientKey).
 */
export interface BraintreeContext {
  /** The braintree-web Client instance once initialized. ShallowRef avoids deep reactivity overhead on SDK objects. */
  client: ShallowRef<Client | null>
  /** True once the client has been successfully created. */
  isReady: Ref<boolean>
  /** Non-null if client creation failed. */
  error: Ref<Error | null>
}

/**
 * Typed injection key for the Braintree client context.
 *
 * Usage (provider): provide(BraintreeClientKey, { client, isReady, error })
 * Usage (consumer): const ctx = inject(BraintreeClientKey)
 */
export const BraintreeClientKey: InjectionKey<BraintreeContext> =
  Symbol('BraintreeClientKey')
