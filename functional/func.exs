defmodule Factorial do
  def of(0), do: 1
  def of(n) when n > 0 do
    n * of(n-1)
  end
end

r1 = Factorial.of(4)
IO.puts r1


defmodule ImperativeFactorial do
  def factorial(n) do
    iter(n, 1, 1)
  end

  def iter(n, counter, product) do
    if counter > n do
      product
    else
      product = counter * product
      counter = counter + 1
      iter(n, counter, product)
    end

  end

end

r3 = ImperativeFactorial.factorial(4)
IO.puts r3