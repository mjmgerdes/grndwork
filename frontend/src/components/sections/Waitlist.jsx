import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { joinWaitlist } from "@/lib/api";

const CURRENT_YEAR = new Date().getFullYear();
const GRAD_YEARS = Array.from({ length: 8 }, (_, i) => CURRENT_YEAR + i);

const CAREER_INTERESTS = [
 const CAREER_INTERESTS = [
  "Software Engineering",
  "AI / Machine Learning",
  "Data Science & Analytics",
  "Cybersecurity",
  "Product Management",
  "Product Design / UX",
  "Engineering",
  "Finance / Investment Banking",
  "Venture Capital / Private Equity",
  "Consulting",
  "Sales / Business Development",
  "Marketing & Growth",
  "Operations",
  "Healthcare / Medicine",
  "Biotech / MedTech",
  "Law / Policy",
  "Government / Public Sector",
  "Nonprofit / Social Impact",
  "Research / Academia",
  "Education",
  "Sustainability / Climate",
  "Startups / Entrepreneurship",
  "Blockchain / Web3",
  "Creator Economy / Content",
  "Other",
  "Still exploring",
];

const schema = z.object({
  name: z.string().min(1, "Your name is required").max(255),
  email: z.string().email("Enter a valid email"),
  school: z.string().min(1, "School is required").max(255),
  graduation_year: z.coerce
    .number({ invalid_type_error: "Select your graduation year" })
    .int()
    .min(CURRENT_YEAR)
    .max(CURRENT_YEAR + 10),
  career_interest: z.string().min(1, "Select a career interest"),
});

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      school: "",
      graduation_year: "",
      career_interest: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await joinWaitlist(values);
      setSubmitted(true);
      toast.success("You're on the list. We'll reach out soon.");
      form.reset();
    } catch (err) {
      const msg =
        err?.message ||
        err?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Failed to join waitlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      data-testid="waitlist-section"
      className="relative py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_80px_rgba(59,130,246,0.12)]"
        >
          <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs tracking-wide text-slate-300">
                Early access
              </span>
            </div>
            <h2
              data-testid="waitlist-headline"
              className="font-display text-4xl sm:text-5xl tracking-tighter font-medium"
            >
              Get early access
            </h2>
            <p
              data-testid="waitlist-subtext"
              className="mt-3 text-slate-400 text-sm sm:text-base"
            >
              Be one of the first students to try grndwork.
            </p>
          </div>

          {submitted ? (
            <div
              data-testid="waitlist-success"
              className="flex flex-col items-center text-center py-8"
            >
              <div className="w-14 h-14 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-7 h-7 text-blue-300" />
              </div>
              <h3 className="font-display text-2xl tracking-tight text-white mb-2">
                You're on the list.
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                We'll reach out soon with your early access invite.
              </p>
              <Button
                data-testid="waitlist-add-another-btn"
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-transparent border-white/15 text-white hover:bg-white/5 hover:border-white/30 rounded-full"
              >
                Add another
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                data-testid="waitlist-form"
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            data-testid="waitlist-input-name"
                            placeholder="Jordan Rivera"
                            className="bg-white/[0.03] border-white/10 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/40 text-white placeholder:text-slate-600 h-11 rounded-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            data-testid="waitlist-input-email"
                            type="email"
                            placeholder="you@school.edu"
                            className="bg-white/[0.03] border-white/10 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/40 text-white placeholder:text-slate-600 h-11 rounded-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        School
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="waitlist-input-school"
                          placeholder="e.g. University of Michigan"
                          className="bg-white/[0.03] border-white/10 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/40 text-white placeholder:text-slate-600 h-11 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="graduation_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          Graduation year
                        </FormLabel>
                        <Select
                          onValueChange={(v) => field.onChange(Number(v))}
                          value={field.value ? String(field.value) : undefined}
                        >
                          <FormControl>
                            <SelectTrigger
                              data-testid="waitlist-select-grad-year"
                              className="bg-white/[0.03] border-white/10 focus:ring-blue-500/40 focus:border-blue-500/40 text-white h-11 rounded-lg data-[placeholder]:text-slate-600"
                            >
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-950 border-white/10 text-white">
                            {GRAD_YEARS.map((y) => (
                              <SelectItem
                                key={y}
                                value={String(y)}
                                data-testid={`waitlist-grad-year-${y}`}
                                className="focus:bg-blue-500/20 focus:text-white"
                              >
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="career_interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          Career interest
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger
                              data-testid="waitlist-select-career"
                              className="bg-white/[0.03] border-white/10 focus:ring-blue-500/40 focus:border-blue-500/40 text-white h-11 rounded-lg data-[placeholder]:text-slate-600"
                            >
                              <SelectValue placeholder="Select a field" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-950 border-white/10 text-white max-h-72">
                            {CAREER_INTERESTS.map((c) => (
                              <SelectItem
                                key={c}
                                value={c}
                                data-testid={`waitlist-career-${c
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")}`}
                                className="focus:bg-blue-500/20 focus:text-white"
                              >
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="waitlist-submit-btn"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-white text-slate-950 hover:bg-slate-200 font-medium text-sm mt-2 shadow-[0_0_40px_rgba(59,130,246,0.25)] disabled:opacity-60"
                >
                  {loading ? "Joining…" : "Claim your spot"}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
