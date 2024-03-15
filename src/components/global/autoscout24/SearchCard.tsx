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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface ScrapySearchCardProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ScrapySearchCar({
  handleSubmit,
}: React.PropsWithChildren<ScrapySearchCardProps>) {
  const ATError = useSelector((state: RootState) => state.autoscout24.error);
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Let's get some data</CardTitle>
        <CardDescription>
          1-Go to page page that you want to scrape in Autoscout24.fr <br />
          2-copy link that you awnt to scrape <br />
          3-link should start with https://www.autoscout24.fr/lst?
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
              <Select name="offers" required>
                <SelectTrigger id="offers">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="19">19</SelectItem>
                  <SelectItem value="38">38</SelectItem>
                  <SelectItem value="57">57</SelectItem>
                  <SelectItem value="76">76</SelectItem>
                </SelectContent>
              </Select>
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
            <span className="text-red-500">{ATError}</span>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" type="reset">
              reset
            </Button>
            <Button type="submit">Start Scraping</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
