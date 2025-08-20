import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Camera, 
  Clock, 
  Database,
  Save,
  RefreshCw,
  AlertTriangle
} from "lucide-react";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@school.edu",
    department: "Mathematics",
    employeeId: "EMP001"
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    emailNotifications: true,
    pushNotifications: false,
    attendanceReminders: true,
    faceRecognitionSensitivity: "medium",
    sessionTimeout: "30",
    defaultAttendanceTime: "09:00"
  });

  const handleProfileUpdate = () => {
    // Handle profile update logic
    console.log("Profile updated:", profileData);
  };

  const handleSystemUpdate = () => {
    // Handle system settings update logic
    console.log("System settings updated:", systemSettings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and system preferences
          </p>
        </div>
        <Badge variant="outline" className="w-fit">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and teaching details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button onClick={handleProfileUpdate} className="gap-2 bg-blue-600 text-white hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Facial Recognition Settings
                </CardTitle>
                <CardDescription>
                  Configure facial recognition sensitivity and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="attendanceTime">Default Attendance Time</Label>
                  <Input
                    id="attendanceTime"
                    type="time"
                    value={systemSettings.defaultAttendanceTime}
                    onChange={(e) => 
                      setSystemSettings(prev => ({ ...prev, defaultAttendanceTime: e.target.value }))
                    }
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="attendanceTime">Absent Attendance Time</Label>
                  <Input
                    id="attendanceTime"
                    type="time"
                    value={systemSettings.defaultAttendanceTime}
                    onChange={(e) => 
                      setSystemSettings(prev => ({ ...prev, defaultAttendanceTime: e.target.value }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Backup and data retention settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto Backup</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically backup attendance data daily
                    </div>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => 
                      setSystemSettings(prev => ({ ...prev, autoBackup: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select
                    value={systemSettings.sessionTimeout}
                    onValueChange={(value) => 
                      setSystemSettings(prev => ({ ...prev, sessionTimeout: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Backup Now
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Database className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Password & Authentication</h4>
                <div className="flex gap-2">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Setup 2FA</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Privacy Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Activity Logging</Label>
                      <div className="text-sm text-muted-foreground">
                        Log user activities for security monitoring
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Anonymous Analytics</Label>
                      <div className="text-sm text-muted-foreground">
                        Share anonymous usage data to improve the system
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Danger Zone
                </h4>
                <div className="p-4 border border-destructive/20 rounded-lg">
                  <div className="space-y-2">
                    <h5 className="font-medium text-destructive">Delete Account</h5>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}