import { loadStripe } from "@stripe/stripe-js"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string)
export default function CheckoutButton(){
  const handleClick = async()=>{
    const stripe = await stripePromise
    if(!stripe) return alert("Stripe not loaded")
    // Simple redirect - we'll add backend session later
    const priceId = import.meta.env.VITE_STRIPE_PRICE_ID
    console.log("Upgrade price:", priceId)
    alert("Stripe Pro checkout wiring next - Price: "+priceId)
  }
  return <button onClick={handleClick} className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400">Upgrade to Pro - $19/mo</button>
}
