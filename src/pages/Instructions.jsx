import React from "react";
import { motion } from "framer-motion";

export default function Instructions() {
  return (
    <div style={{ maxWidth: 1100, margin: "12px auto" }}>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>How EcoInsight Works</motion.h2>

      <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
        <div className="card">
          <h3>1. Sign Up & Create Profile</h3>
          <br />
          <p>Register with your First Name, Username, Email and a secure password. Your profile stores your uploads and points locally for this demo.</p>
        </div>

        <div className="card">
          <h3>2. Upload Waste</h3>
          <br />
          <p>Go to Upload & drop an image of your waste. Our AI classifier simulates classification and awards Eco Points when appropriate.</p>
        </div>

        <div className="card">
          <h3>3. Earn Eco Points</h3>
          <br />
          <ul>
            <li>Correct classification → +10 points</li>
            <li>Reading Awareness articles → +5 points each (demo)</li>
            <li>Referral / Challenges → bonus points (future)</li>
          </ul>
        </div>

        <div className="card">
          <h3>4. View History</h3>
          <br />
          <p>See all your uploads on History with timestamps, categories, and points earned.</p>
        </div>

        <div className="card">
          <h3>5. Redeem Points</h3>
          <br />
          <p>Use points on the Redeem page to get badges or discounts (demo items listed).</p>
        </div>

        <div className="card">
          <h3>Tips to Maximize Points</h3>
          <br />
          <ul>
            <li> Upload clear photos with a single item per image.</li>

            <li> Read Awareness articles and take part in challenges.</li>
            
            <li> Report community litter to earn bonus credit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
