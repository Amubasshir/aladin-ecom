import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl text-red-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
        voluptatem magni id incidunt harum eius. Unde corrupti libero laborum
        maiores et totam?
      </h1>
      <h1 className="text-2xl text-red-500 font-lato">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nemo?
        Nemo saepe iure quam placeat quis deserunt hic tenetur amet ipsam totam?
      </h1>
      <Button variant="destructive" size="sm">
        Click me
      </Button>
    </div>
  );
}
