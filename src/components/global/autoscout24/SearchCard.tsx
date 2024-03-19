import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/state/store";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

interface ScrapySearchCardProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ScrapySearchCar({
  handleSubmit,
}: React.PropsWithChildren<ScrapySearchCardProps>) {
  const ATError = useSelector((state: RootState) => state.autoscout24.error);
  const isLoading = useSelector(
    (state: RootState) => state.autoscout24.loading
  );
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Let's get some data</CardTitle>
        <CardDescription>
          1-open https://www.autoscout24.fr/lst? <br />
          2-make your fileter <br />
          3-copy url
          <br />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="Paste URL Here"
                required
              />
              
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="startPage">Start page</Label>
              <Input
                id="startPage"
                min={1}
                max={20}
                name="startPage"
                placeholder="Start scraping from (1 to 20)"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="offers">Offers Number</Label>
              <Input
                id="offers"
                min={1}
                max={100}
                name="offers"
                placeholder="Start scraping from (1 to 100)"
                required
              />
              
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="waitingTime">
                Max waiting time (Network spped)
              </Label>
              <Select name="waitingTime" required>
                <SelectTrigger id="waitingTime">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="5" defaultChecked>
                    5
                  </SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <RadioGroup defaultValue="all" name="businessType" className="flex flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2b" id="r1" />
                  <Label htmlFor="r1">B2B</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2c" id="r2" />
                  <Label htmlFor="r2">B2C</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="r3" />
                  <Label htmlFor="r3">All</Label>
                </div>
              </RadioGroup>
            </div>
            <span className="text-red-500">{ATError}</span>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" type="reset">
              Reset
            </Button>
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Start Scraping</Button>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
