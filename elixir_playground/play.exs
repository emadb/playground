defmodule Fact do
  def of(0), do: 1
  def of(n), do: n * of(n-1) 
end

defmodule Coll do
  def reduce(list), do: _reduce(0, list)
  defp _reduce(acc, []), do: acc
  defp _reduce(acc, [h | t]), do: _reduce(acc + h, t)
end

defmodule F do
  def fib2 do
    Stream.unfold({0, 1}, fn {a, b} -> {a, {b, a + b}} end)
  end  
end


F.fib2 |> Enum.take(10) |> Enum.map &(IO.puts " #{&1}")