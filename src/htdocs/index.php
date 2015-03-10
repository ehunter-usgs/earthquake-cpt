<?php
if (!isset($TEMPLATE)) {
  $TITLE = "Cone Penetration Testing (CPT)";
  $NAVIGATION = true;
  $HEAD = '<link rel="stylesheet" href="../style.css"/>';

  include_once 'template.inc.php';
}
?>

<figure class="right two-of-five">
  <img src="images/truck_new.jpg" alt="image showing CPT rig and subsurface"/>
  <figcaption>
    Photo by Scott Haefner, USGS. Figure by Tom Holzer, USGS.
  </figcaption>
</figure>

<p>
  Cone Penetration Testing (CPT) is used to identify subsurface conditions in
  the upper 100 ft of the subsurface. The USGS CPT uses a 23-ton truck to push
  a &ldquo;<a href="cone.html" rel="cone">cone</a>&rdquo; into the ground.
  The weight of the truck is partially supported by both the tip of the cone
  and the sleeve of the cone. The &ldquo;tip resistance&rdquo; is determined by
  the force required to push the tip of the cone and the &ldquo;sleeve
  friction&rdquo; is determined by the force required to push the sleeve
  through the soil. The &ldquo;friction ratio&rdquo; is the ratio between
  sleeve friction and tip resistance, measured as a percentage. Soil type and
  thereby resistance to liquefaction can be inferred from these measurements.
</p>
<p>
  <a href="./data/">Data from the USGS cone</a>, which includes a
  <a href="shaking.html" rel="shaking">seismometer</a>, can also be used to
  predict how local shallow soil conditions can modify shaking. The capacity
  of local soil conditions to modify shaking is inversely proportional to the
  shear-wave velocity near the surface, which can be computed with data
  recorded with the seismometer. Seismic energy is created manually with a
  sledgehammer or automatically by a compressed air driven hammer. We measure
  the time it takes for the seismic energy to travel from the land surface,
  through the ground, to the seismometer mounted in the cone. The distance to
  the seismometer divided by the travel time of the shear-wave is approximately
  the average shear-wave velocity.
</p>
<p>
  Output from the cone as it penetrates the soil is digitally recorded by a
  computer and is collectively known as a sounding.
</p>

<h2>See also</h2>
<ul>
  <li>
    USGS Factsheet:
    <a href="http://geopubs.wr.usgs.gov/fact-sheet/fs028-03/">Subsurface
        Exploration with the Cone Penetration Testing Truck</a>
  </li>
</ul>

<h2 class="researcher">Scientific Staff</h2>
<ul>
  <li>Mike Bennett</li>
  <li><a href="https://profile.usgs.gov/tholzer/">Tom Holzer</a></li>
  <li>Tom Noce</li>
</ul>
