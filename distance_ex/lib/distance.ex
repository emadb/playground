defmodule Distance do
  def calculate(points) do

  end

 defp internal_calculate(total, head, [h | t]) do
   internal_calculate(total, head, h)
 end

  defp distance_between(p1, p2) do
    dx = p1[0] - p2[0]
    dy = p1[1] - p2[1]
    :math.sqrt( dx * dx + dy * dy)
  end

end
