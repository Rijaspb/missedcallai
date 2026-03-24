import type { Tables } from './database'

// Derived directly from your database schema
export type Customer = Tables<'customers'>
export type CallLog = Tables<'call_logs'>

// Notification channel options
export type NotificationChannel = 'sms' | 'whatsapp' | 'email'

// Subscription status options
export type SubscriptionStatus = 'trial' | 'active' | 'cancelled'