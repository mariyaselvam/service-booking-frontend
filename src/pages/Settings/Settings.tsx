import React, { useState } from "react";
import {
  Settings,
  Percent,
  Shield,
  CreditCard,
  Map,
  Save,
  Loader2,
  Building,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Gauge,
  Users,
  Key,
  Lock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SettingsState {
  // General Settings
  businessName: string;
  supportEmail: string;
  supportPhone: string;
  maintenanceMode: boolean;
  currency: string;
  language: string;

  // Business Logic
  platformCommission: number;
  maxServiceRadius: number;
  minBookingAmount: number;
  autoAssignProvider: boolean;

  // Payments & Taxes
  paymentGateway: string;
  gstPercentage: number;
  payoutCycle: string;

  // Security & API
  googleMapsApiKey: string;
  twoFactorAuth: boolean;
}

const SystemSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [settings, setSettings] = useState<SettingsState>({
    // General Settings
    businessName: "ServiceHub",
    supportEmail: "support@servicehub.com",
    supportPhone: "+91 9876543210",
    maintenanceMode: false,
    currency: "INR",
    language: "en",

    // Business Logic
    platformCommission: 15,
    maxServiceRadius: 25,
    minBookingAmount: 199,
    autoAssignProvider: false,

    // Payments & Taxes
    paymentGateway: "razorpay",
    gstPercentage: 18,
    payoutCycle: "weekly",

    // Security & API
    googleMapsApiKey: "AIzaSyC4R6AN7SmujjPUIGKdgDg************************",
    twoFactorAuth: true,
  });

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ): void => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = async (): Promise<void> => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
    console.log("Settings saved:", settings);
  };

  const handlePasswordChange = async (): Promise<void> => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-background antialiased p-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              System Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure your platform's core functionality and behavior
            </p>
          </div>
          {hasChanges && (
            <Badge className="bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 border-0 font-medium">
              Unsaved Changes
            </Badge>
          )}
        </div>

        {/* Save Button - Sticky Header */}
        <div className="bg-card rounded-lg ring-1 ring-border p-4 sticky top-4 z-10 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Configuration Panel
              </span>
            </div>
            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges || isSaving}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger
              value="general"
              className="flex items-center gap-2 data-[state=active]:bg-card"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="flex items-center gap-2 data-[state=active]:bg-card"
            >
              <Percent className="w-4 h-4" />
              <span className="hidden sm:inline">Business Logic</span>
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex items-center gap-2 data-[state=active]:bg-card"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center gap-2 data-[state=active]:bg-card"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Building className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Business Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="businessName"
                    className="text-sm font-medium text-foreground"
                  >
                    Business Name
                  </Label>
                  <input
                    id="businessName"
                    type="text"
                    value={settings.businessName}
                    onChange={(e) =>
                      updateSetting("businessName", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="supportEmail"
                    className="text-sm font-medium text-foreground"
                  >
                    Support Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) =>
                        updateSetting("supportEmail", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="supportPhone"
                    className="text-sm font-medium text-foreground"
                  >
                    Support Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="supportPhone"
                      type="tel"
                      value={settings.supportPhone}
                      onChange={(e) =>
                        updateSetting("supportPhone", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Localization & System
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="currency"
                    className="text-sm font-medium text-foreground"
                  >
                    Currency
                  </Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => updateSetting("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">
                        INR (₹) - Indian Rupee
                      </SelectItem>
                      <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                      <SelectItem value="GBP">
                        GBP (£) - British Pound
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="language"
                    className="text-sm font-medium text-foreground"
                  >
                    Default Language
                  </Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => updateSetting("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="ta">Tamil (தமிழ்)</SelectItem>
                      <SelectItem value="te">Telugu (తెలుగు)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="maintenanceMode"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Maintenance Mode
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Temporarily disable the platform for updates
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked: any) =>
                      updateSetting("maintenanceMode", checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 2: Business Logic & Commission */}
          <TabsContent value="business" className="space-y-6">
            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Revenue & Commission
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="platformCommission"
                    className="text-sm font-medium text-foreground"
                  >
                    Platform Commission (%)
                  </Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="platformCommission"
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={settings.platformCommission}
                      onChange={(e) =>
                        updateSetting(
                          "platformCommission",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Platform fee deducted from each transaction
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="minBookingAmount"
                    className="text-sm font-medium text-foreground"
                  >
                    Minimum Booking Amount (₹)
                  </Label>
                  <input
                    id="minBookingAmount"
                    type="number"
                    min="0"
                    step="10"
                    value={settings.minBookingAmount}
                    onChange={(e) =>
                      updateSetting(
                        "minBookingAmount",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum order value required to place a booking
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Map className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Service Area & Matching
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="maxServiceRadius"
                    className="text-sm font-medium text-foreground"
                  >
                    Maximum Service Radius (km)
                  </Label>
                  <div className="relative">
                    <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="maxServiceRadius"
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      value={settings.maxServiceRadius}
                      onChange={(e) =>
                        updateSetting(
                          "maxServiceRadius",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum distance vendors can be matched to customers
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-0.5 flex-1">
                    <Label
                      htmlFor="autoAssignProvider"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Auto-Assign Provider
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically assign nearest available vendor vs manual
                      selection
                    </p>
                  </div>
                  <Switch
                    id="autoAssignProvider"
                    checked={settings.autoAssignProvider}
                    onCheckedChange={(checked: any) =>
                      updateSetting("autoAssignProvider", checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 3: Payments & Taxes */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Payment Gateway
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="paymentGateway"
                    className="text-sm font-medium text-foreground"
                  >
                    Active Payment Gateway
                  </Label>
                  <Select
                    value={settings.paymentGateway}
                    onValueChange={(value) =>
                      updateSetting("paymentGateway", value)
                    }
                  >
                    <SelectTrigger id="paymentGateway">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">
                        Razorpay (Recommended for India)
                      </SelectItem>
                      <SelectItem value="stripe">
                        Stripe (International)
                      </SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Payment processor for customer transactions
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="gstPercentage"
                    className="text-sm font-medium text-foreground"
                  >
                    GST/Tax Percentage (%)
                  </Label>
                  <input
                    id="gstPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={settings.gstPercentage}
                    onChange={(e) =>
                      updateSetting("gstPercentage", parseFloat(e.target.value))
                    }
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tax applied to all transactions
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Vendor Payouts
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="payoutCycle"
                    className="text-sm font-medium text-foreground"
                  >
                    Payout Cycle
                  </Label>
                  <Select
                    value={settings.payoutCycle}
                    onValueChange={(value) =>
                      updateSetting("payoutCycle", value)
                    }
                  >
                    <SelectTrigger id="payoutCycle">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How frequently vendors receive their earnings
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 4: Security & API */}
          <TabsContent value="security" className="space-y-6">
            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Admin Password
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="currentPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Current Password
                  </Label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    New Password
                  </Label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm New Password
                  </Label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Key className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  API Configuration
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="googleMapsApiKey"
                    className="text-sm font-medium text-foreground"
                  >
                    Google Maps API Key
                  </Label>
                  <input
                    id="googleMapsApiKey"
                    type="password"
                    value={settings.googleMapsApiKey}
                    onChange={(e) =>
                      updateSetting("googleMapsApiKey", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground">
                    Required for location tracking, radius matching, and map
                    features
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 ring-1 ring-border">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Security Features
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-0.5 flex-1">
                    <Label
                      htmlFor="twoFactorAuth"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Two-Factor Authentication (2FA)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Require 2FA for admin login for enhanced security
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked: any) =>
                      updateSetting("twoFactorAuth", checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Footer */}
        <Card className="p-4 ring-1 ring-border bg-blue-500/5">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Configuration Tips
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Changes to commission rates and service radius take effect
                immediately. Test thoroughly before enabling maintenance mode as
                it will make the platform unavailable to all users.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings;
