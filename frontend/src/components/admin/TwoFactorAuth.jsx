import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, 
  QrCode, 
  Copy, 
  Check, 
  Key,
  AlertTriangle,
  Download,
  RefreshCw,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useToast } from '../../hooks/use-toast';

const TwoFactorAuth = ({ isEnabled = false, onClose }) => {
  const [step, setStep] = useState(isEnabled ? 'manage' : 'setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([
    'A1B2-C3D4', 'E5F6-G7H8', 'I9J0-K1L2', 'M3N4-O5P6',
    'Q7R8-S9T0', 'U1V2-W3X4', 'Y5Z6-A7B8', 'C9D0-E1F2'
  ]);
  const [secretKey] = useState('JBSWY3DPEHPK3PXP');
  const [qrCodeUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/KohariGonzalez%20Admin:sara.gonzalez@koharigonzalez.com?secret=JBSWY3DPEHPK3PXP&issuer=KohariGonzalez');
  const { toast } = useToast();
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'secret') {
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    } else {
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 2000);
    }
    toast({
      title: "Copied!",
      description: `${type === 'secret' ? 'Secret key' : 'Backup codes'} copied to clipboard`,
    });
  };

  const handleVerification = () => {
    if (verificationCode.length === 6) {
      toast({
        title: "2FA Enabled!",
        description: "Two-factor authentication has been successfully enabled for your account.",
      });
      setStep('backup');
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code from your authenticator app.",
        variant: "destructive",
      });
    }
  };

  const disable2FA = () => {
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account.",
      variant: "destructive",
    });
    if (onClose) onClose();
  };

  const generateNewBackupCodes = () => {
    const newCodes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
      Math.random().toString(36).substring(2, 6).toUpperCase()
    );
    setBackupCodes(newCodes);
    toast({
      title: "New Backup Codes Generated",
      description: "Your old backup codes are no longer valid.",
    });
  };

  if (step === 'manage' && isEnabled) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            2FA is currently enabled and protecting your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">2FA is Active</p>
                <p className="text-sm text-green-700">Your account is protected with two-factor authentication</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Manage Your 2FA Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => setStep('backup')}>
                <Key className="w-4 h-4 mr-2" />
                View Backup Codes
              </Button>
              <Button variant="outline" onClick={generateNewBackupCodes}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Codes
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-900">Disable Two-Factor Authentication</p>
                <p className="text-sm text-red-700 mb-3">
                  This will make your account less secure. Only disable if absolutely necessary.
                </p>
                <Button variant="outline" onClick={disable2FA} className="text-red-600 border-red-300">
                  <X className="w-4 h-4 mr-2" />
                  Disable 2FA
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'backup') {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Backup Codes</CardTitle>
          <CardDescription>
            Save these backup codes in a secure location. Each code can only be used once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3 font-mono text-sm">
              {backupCodes.map((code, idx) => (
                <div key={idx} className="p-2 bg-white rounded border text-center">
                  {code}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="text-sm text-orange-800">
              <p className="font-medium mb-1">Important:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Store these codes in a secure location</li>
                <li>Each code can only be used once</li>
                <li>Use these if you lose access to your authenticator app</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(isEnabled ? 'manage' : 'setup')}>
              Back
            </Button>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(backupCodes.join('\n'), 'backup')}
              >
                {copiedBackup ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copiedBackup ? 'Copied!' : 'Copy Codes'}
              </Button>
              <Button onClick={() => setStep('manage')} className="bg-[#20B2AA] hover:bg-[#1a9d96]">
                Done
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Enable Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your admin account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 'setup' && (
          <>
            <div className="space-y-4">
              <h4 className="font-medium">Step 1: Install an Authenticator App</h4>
              <p className="text-sm text-slate-600">
                Download and install one of these authenticator apps on your mobile device:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-2 text-[#20B2AA]" />
                  <p className="font-medium text-sm">Google Authenticator</p>
                  <p className="text-xs text-slate-500">iOS & Android</p>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-2 text-[#20B2AA]" />
                  <p className="font-medium text-sm">Authy</p>
                  <p className="text-xs text-slate-500">iOS & Android</p>
                </div>
                <div className="p-3 border rounded-lg text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-2 text-[#20B2AA]" />
                  <p className="font-medium text-sm">Microsoft Authenticator</p>
                  <p className="text-xs text-slate-500">iOS & Android</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Step 2: Scan QR Code or Enter Secret Key</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-3">Scan this QR code with your authenticator app:</p>
                  <div className="inline-block p-4 bg-white border rounded-lg">
                    <img 
                      src={qrCodeUrl} 
                      alt="2FA QR Code" 
                      className="w-40 h-40"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-3">Or manually enter this secret key:</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm break-all">
                      {secretKey}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(secretKey, 'secret')}
                      className="w-full"
                    >
                      {copiedSecret ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedSecret ? 'Copied!' : 'Copy Secret Key'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Step 3: Enter Verification Code</h4>
              <p className="text-sm text-slate-600">
                Enter the 6-digit code from your authenticator app to verify the setup:
              </p>
              <div className="space-y-3">
                <Label htmlFor="verification">Verification Code</Label>
                <Input
                  id="verification"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="text-center text-lg tracking-widest font-mono"
                  maxLength={6}
                />
                <p className="text-xs text-slate-500">
                  Enter the current 6-digit code displayed in your authenticator app
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleVerification}
                className="bg-[#20B2AA] hover:bg-[#1a9d96]"
                disabled={verificationCode.length !== 6}
              >
                <Shield className="w-4 h-4 mr-2" />
                Enable 2FA
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;