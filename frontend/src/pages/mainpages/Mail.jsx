import React, { useState } from 'react';
import Sidebar from '../layout/sidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/sonner";
import { toast } from 'sonner';

const Mail = () => {
  const [mailData, setMailData] = useState({
    to: '',
    subject: '',
    body: '',
    from: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailData),
      });
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Email sent successfully!",
        });
        // Reset form
        setMailData({
          to: '',
          subject: '',
          body: '',
          from: ''
        });
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: errorData.message || "Failed to send email",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while sending the email",
      });
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mx-auto p-4 mt-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send Email</CardTitle>
            <CardDescription>
              Compose and send an email to your contacts
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from">From (optional)</Label>
                <Input
                  id="from"
                  name="from"
                  placeholder="Your email address"
                  value={mailData.from}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  name="to"
                  placeholder="Recipient email address"
                  value={mailData.to}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Email subject"
                  value={mailData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Type your message here"
                  value={mailData.body}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Email"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Mail;