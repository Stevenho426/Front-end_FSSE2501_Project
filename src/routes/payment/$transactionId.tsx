import { createFileRoute } from '@tanstack/react-router'
import Payment from "../../ui/page/CheckoutPage/component/Payment.tsx";

export const Route = createFileRoute('/payment/$transactionId')({
  component: Payment,
})

