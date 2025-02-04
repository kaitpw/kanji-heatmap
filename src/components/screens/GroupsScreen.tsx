import { Button } from "@/components/ui/button";
import { useSearchParams } from "wouter";

const GroupsScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const helloParam = searchParams.get("hello");
  const fooParam = searchParams.get("foo");
  const noExistParam = searchParams.get("noExist");

  return (
    <div>
      Groups Screen
      <p>Hello: {helloParam ?? "none"}</p>
      <p>Foo Param: {fooParam ?? "none"}</p>
      <p>No Exist: {noExistParam ?? "none"}</p>
      <Button
        onClick={() => {
          const randomInt = () => Math.round(Math.random() * 1000);
          const partial = {
            hello: `hello-${randomInt()}`,
            foo: `foo-${randomInt()}`,
          };
          setSearchParams(
            Math.random() > 0.5
              ? partial
              : { ...partial, noExist: `existing-actually-${randomInt()}` }
          );
        }}
      >
        Click Me
      </Button>
    </div>
  );
};

export default GroupsScreen;
