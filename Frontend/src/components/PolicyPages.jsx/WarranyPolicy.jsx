import React from "react";

const WarrantyPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="p-8 rounded-lg shadow-lg  w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Radhe Laptops Warranty Policy
        </h1>

        <p className="text-lg mb-4">
          Radhe Laptops offers a <strong>6-month + 1-month breakage warranty</strong> on every mobile screen repaired or replaced by us from the date of invoice. We also provide a <strong>3-month warranty</strong> on all other spare parts that we replace.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Warranty Coverage</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Screen/LCD that malfunctions or does not work as intended.</li>
          <li>Any display issues that arise without manual intervention, specifically touch issues.</li>
          <li>One-time screen replacement in case of accidental damage if claimed within 1 month from the invoice date.</li>
        </ul>

        <p className="mb-4">
          If the replaced screen causes any of the above issues, you are eligible for a <strong>brand-new screen replacement</strong> with the continued 6-month warranty.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Important Notes</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>The warranty is valid only for the specific device repaired and the original customer. It is not transferable.</li>
          <li>The mobile phone must be functional, except for screen issues, to process a claim.</li>
          <li>If the old screen is not handed over, the warranty applies for only 3 months.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">How to Claim Your Warranty</h2>
        <ol className="list-decimal pl-6 mb-4">
          <li>Share a video of the phone displaying the issue at <a href="mailto:support@radhelaptops.in">support@radhelaptops.in</a>.</li>
          <li>Send your phone number, order number, or IMEI number to the same email.</li>
          <li>Our team will respond within <strong>48 to 72 hours</strong> and assist you with your claim.</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-3">Warranty Limitations</h2>
        <p className="mb-4">
          The warranty applies only to the paid parts and services. If only parts were purchased, the warranty covers their replacement. If repair service was also purchased, the warranty extends to labor costs for part replacement.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Warranty Does Not Cover</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Accidental damage beyond one-time screen replacement.</li>
          <li>Display issues caused by excessive damage or external pressure.</li>
          <li>Water damage or tampering with internal hardware.</li>
          <li>Software issues unrelated to the repair.</li>
          <li>Devices with pre-existing manufacturing or performance issues.</li>
          <li>Any new damages occurring after repair.</li>
          <li>Data loss due to repair – customers should back up their data before repair.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>
        <p className="mb-4">
          Refunds are applicable only if the customer allows us to remove the installed Radhe Laptops parts and replace them with the device’s original faulty parts. Refunds do not apply to other replaced parts.
        </p>

        <p className="text-center mt-6">
          For further assistance, contact us at <a href="mailto:support@radhelaptops.in" className="font-semibold">support@radhelaptops.in</a>.
        </p>
      </div>
    </div>
  );
};

export default WarrantyPolicy;
