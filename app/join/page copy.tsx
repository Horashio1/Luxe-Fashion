"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { BackButton } from "../components/BackButton";
import { useRouter } from "next/navigation";

export default function DesignerOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const router = useRouter();

  // Form data: signatureDate defaults to today's date (YYYY-MM-DD)
  const [formData, setFormData] = useState({
    // --- Step 1 ---
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    socialInsta: "",
    socialFb: "",
    address: "",
    country: "",

    // --- Step 2 ---
    productTypes: [] as string[],
    productTypesOthers: "",
    targetAudience: "",
    yearsInBusiness: "",
    briefBusinessDescription: "",

    // --- Step 3 ---
    categoriesProducts: [] as string[],
    priceRange: "",
    materialsUsed: "",
    sustainabilityPractices: "",
    usp: "",
    certificationsAwards: "",

    // --- Step 4 ---
    preferredCollaborationTypes: [] as string[],
    preferredMarket: "",
    availability: "",
    logisticsShipping: "",

    // --- Step 5 ---
    businessRegNumber: "",
    taxNumber: "",
    bankingInfo: "",
    ipDetails: "",

    // --- Step 6 ---
    inspiration: "",
    expectations: "",
    productCatalog: null as File | null,
    registrationProof: null as File | null,
    authenticityCert: null as File | null,

    // --- Step 7 ---
    agreement: false,
    signature: "",
    // Default today's date in YYYY-MM-DD format
    signatureDate: new Date().toISOString().split("T")[0],
  });

  // For success overlay
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle multi-checkbox
  function handleCheckboxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "productTypes" | "categoriesProducts" | "preferredCollaborationTypes"
  ) {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentValues = new Set(prev[fieldName]);
      if (checked) {
        currentValues.add(value);
      } else {
        currentValues.delete(value);
      }
      return {
        ...prev,
        [fieldName]: Array.from(currentValues),
      };
    });
  }

  // Handle radio
  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      preferredMarket: e.target.value,
    }));
  }

  // Final submission (no-cors, no validations)
  const handleSubmit = async () => {
    try {
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbzTfXyB4qqaeN2RGNhAjfDyndfpTOQhdR9jXrozrZ1oZfz6n3kUefuDZeF9ixOyKRmiRw/exec";

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Show success overlay
      setShowSuccess(true);

      // Redirect home after a short delay
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-green-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p>Your application has been submitted. You will hear from us soon.</p>
          </div>
        </div>
      )}

      {/* Left image/branding panel */}
      <div className="hidden lg:block w-1/3 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Palette size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-light tracking-wide">Join SOS GOG</h2>
            <p className="mt-2 text-white/80">Elevate your designs with us</p>
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto">
        <BackButton href="/" />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-light mb-2">
            Online Fashion Designer/Luxury Goods Artisan Onboarding
          </h1>
          <p className="text-white/60 mb-8">
            Step {step} of {totalSteps}
          </p>

          <div className="space-y-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">
                  Personal and Business Information
                </h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Business/Brand Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Website or Portfolio Link
                    </label>
                    <input
                      type="url"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Social Media Handles
                    </label>
                    <input
                      type="text"
                      placeholder="Instagram"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-2 focus:outline-none"
                      value={formData.socialInsta}
                      onChange={(e) =>
                        setFormData({ ...formData, socialInsta: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Facebook"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.socialFb}
                      onChange={(e) =>
                        setFormData({ ...formData, socialFb: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Business Address
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Country of Operation
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">Business Overview</h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Type of Products Offered
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Women's Fashion",
                        "Men's Fashion",
                        "Kids' Fashion",
                        "LGBTQ+ Fashion",
                        "Accessories",
                        "Home & Living",
                        "Lifestyle Products",
                      ].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            value={type}
                            checked={formData.productTypes.includes(type)}
                            onChange={(e) =>
                              handleCheckboxChange(e, "productTypes")
                            }
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Others (Specify)"
                      className="mt-4 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.productTypesOthers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productTypesOthers: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Target Audience
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Years in Business
                    </label>
                    <input
                      type="number"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.yearsInBusiness}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          yearsInBusiness: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Brief Business Description
                    </label>
                    <textarea
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      placeholder="100-200 words"
                      value={formData.briefBusinessDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          briefBusinessDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">
                  Product and Design Information
                </h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Categories of Products
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Ready-to-Wear",
                        "Haute Couture",
                        "Artisanal Goods",
                        "Sustainable Fashion",
                        "Custom-Made Items",
                      ].map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            value={category}
                            checked={formData.categoriesProducts.includes(
                              category
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(e, "categoriesProducts")
                            }
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Price Range
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.priceRange}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priceRange: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Materials Used
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      placeholder="e.g., Organic Cotton, Silk, Recycled Materials"
                      value={formData.materialsUsed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          materialsUsed: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Sustainability Practices
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.sustainabilityPractices}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sustainabilityPractices: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Unique Selling Proposition (USP)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.usp}
                      onChange={(e) =>
                        setFormData({ ...formData, usp: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Certifications or Awards
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.certificationsAwards}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          certificationsAwards: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">Collaboration Details</h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Preferred Collaboration Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "Exclusive Collections",
                        "Featured Listings",
                        "Brand Partnerships",
                        "Licensing Agreements",
                      ].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            value={type}
                            checked={formData.preferredCollaborationTypes.includes(
                              type
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e,
                                "preferredCollaborationTypes"
                              )
                            }
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Preferred Geographical Market
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Local", "Regional", "Global"].map((market) => (
                        <label key={market} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="market"
                            className="form-radio"
                            value={market}
                            checked={formData.preferredMarket === market}
                            onChange={handleRadioChange}
                          />
                          <span>{market}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Availability for Interviews/Meetings
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      placeholder="Specify Time Zones"
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Logistics and Shipping Capabilities
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      placeholder="e.g., Domestic/International"
                      value={formData.logisticsShipping}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          logisticsShipping: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">Legal and Financial Information</h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Business Registration Number
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.businessRegNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessRegNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Tax Identification Number (TIN)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.taxNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taxNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Banking Information
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.bankingInfo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bankingInfo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Intellectual Property Rights Details
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.ipDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ipDetails: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">Additional Information</h2>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      What inspired you to join our platform?
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.inspiration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          inspiration: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Specific expectations or goals from this collaboration
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.expectations}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expectations: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Upload Relevant Documents
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-white/40 mb-1">
                          Product Catalog
                        </label>
                        <input
                          type="file"
                          className="w-full"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productCatalog: e.target.files
                                ? e.target.files[0]
                                : null,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-1">
                          Business Registration Proof
                        </label>
                        <input
                          type="file"
                          className="w-full"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              registrationProof: e.target.files
                                ? e.target.files[0]
                                : null,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 mb-1">
                          Photos/Certificates of Authenticity
                        </label>
                        <input
                          type="file"
                          className="w-full"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              authenticityCert: e.target.files
                                ? e.target.files[0]
                                : null,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7 */}
            {step === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light">Agreement and Consent</h2>
                <div className="grid gap-6">
                  <div>
                    <label className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox mt-1"
                        checked={formData.agreement}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            agreement: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm">
                      I have read and agree to the platform&#39;s terms and conditions.
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Signature (Typed Name)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.signature}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signature: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none"
                      value={formData.signatureDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatureDate: e.target.value,
                        })
                      }
                      // Make it readOnly so user can't change it
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 border border-white/30 text-white py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Previous
                </button>
              )}
              {step < totalSteps ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
