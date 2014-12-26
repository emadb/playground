defmodule DistanceTest do
  use ExUnit.Case

  test "the truth" do
    assert 1 + 1 == 2
  end

  test "distance" do
    points = [[1,2], [3,4], [5,6]]
    distance = Distance.calculate(points)
    expected = :math.sqrt(8) * 2
    assert distance == expected
  end
end
