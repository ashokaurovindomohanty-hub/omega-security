export default function UserManual(){
 return (
 <div className="max-w-4xl mx-auto p-8 text-white space-y-6">
 <h1 className="text-3xl font-bold">OMEGA SECURITY — User Manual</h1>
 <h2 className="text-xl font-semibold text-yellow-400">Free Features</h2>
 <ul className="list-disc ml-6 space-y-1">
 <li>Boot Sequence & StatusBar monitoring</li>
 <li>Threat Feed Panel - live threats</li>
 <li>Simulation Sandbox</li>
 <li>Command Input & AI Face</li>
 </ul>
 <h2 className="text-xl font-semibold text-yellow-400">Pro Features ($19/mo)</h2>
 <ul className="list-disc ml-6 space-y-1">
 <li>Quantum Encryption Panel</li>
 <li>Zero Trust Panel</li>
 <li>Behavioral Anomaly Detection</li>
 <li>Auto-Defend Panel - automatic response</li>
 </ul>
 <p className="text-sm opacity-70">Upgrade via Stripe Pro button on dashboard to unlock Pro panels.</p>
 </div>
 )
}
