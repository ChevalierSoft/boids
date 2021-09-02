let g_flock = [];
let g_projectiles = [];

function setup()
{
	let nb_elem_at_startup = 0;

	createCanvas(950, 950);
	for (let i = 0; i < nb_elem_at_startup; ++i)
		g_flock.push(new Boid(random(width), random(height)));
	background(50, 50, 50);
}

function draw()
{
	// background(0, 0, 0, 10);
	background(0, 0, 0);

	let boundary = new Rectangle(width / 2, height/2, width/2, height/2);
	let qt = new QuadTree(boundary, 4);
	for (let p of g_flock)
		qt.insert(p);
	// show QuadTree
	qt.show();

	for (let boid of g_flock)
	{
		boid.edges();
		boid.flock(g_flock);
		// boid.update();
		boid.fire(g_projectiles);
		boid.show();
	}
	let i = 0;
	for (let fire of g_projectiles)
	{
		if (fire.lifetime <= 0)
		{
			g_projectiles.splice(i, 1);
		}
		fire.update();
		fire.show();
		++i;
	}

	// debug : counter of Boids and Projectiles
	stroke(200);
	strokeWeight(4);
	fill(0);
	text(g_flock.length, 100, 70);
	text(g_projectiles.length, 100, 100);

	// getting an array of boids in a range with the Quadtree
	strokeWeight(1);
	noFill();
	stroke(0, 255, 0);
	rectMode(CENTER);
	let range = new Rectangle(width/2, height/2, 200, 200);
	rect(range.x, range.y, range.w*2, range.h*2);

	let inside_range = qt.query(range);
	for (let p of inside_range)
	{
		stroke(200, 0, 0, 150);
		rect(p.position.x, p.position.y, 30, 30);
	}
	text(inside_range.length, 190, 190);

}

function mouseDragged()
{
	for (let boid of g_flock)
	{
		let bmouse = createVector(mouseX - boid.position.x, mouseY - boid.position.y);
		boid.acceleration.add(bmouse);
	}	
}

function mousePressed()
{
	g_flock.push(new Boid(mouseX, mouseY));
}
