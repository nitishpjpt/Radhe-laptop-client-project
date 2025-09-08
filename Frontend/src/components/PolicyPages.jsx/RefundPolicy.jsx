import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Radhe Laptops Refund Policy
        </h1>

        <p className="text-lg mb-4">
          At <span className="font-semibold">Radhe Laptops</span>, we offer a 6-month warranty along with a refund policy for screen replacements.
        </p>

        <h2 className="text-2xl font-semibold mb-3">How to Claim a Refund</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>The screen malfunctions or does not function as intended.</li>
          <li>Display issues arise without manual intervention, such as dead pixels or touch issues.</li>
        </ul>

        <p className="mb-4">If your replaced screen experiences any of the above issues, you are eligible for:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>A brand-new screen replacement with the remaining 6-month warranty.</li>
          <li>A refund within 7 days of the service date by returning the replaced screen.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">Steps to Claim Your Refund</h2>
        <ol className="list-decimal pl-6 mb-4">
          <li>Share a video showing the display issue at <a href="mailto:support@radhelaptops.in">support@radhelaptops.in</a>.</li>
          <li>Send your phone number, order number, or IMEI number.</li>
          <li>Our Customer Service Associate will respond within 48 hours and schedule a technician visit.</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-3">Warranty & Refund Policy</h2>
        <p className="mb-4">The warranty and refund are limited to the parts and/or services paid for.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>If only parts were purchased, the warranty applies only to part replacement.</li>
          <li>If parts and repair service were purchased, the warranty covers the labor cost of part replacement and related repairs.</li>
        </ul>

        <p className="text-center mt-6">
          For further assistance, contact us at <a href="mailto:support@radhelaptops.in" className="font-semibold">support@radhelaptops.in</a>.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;